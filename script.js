
"use strict";

// Get elements from HTML
const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("usernameInput");
const statusBox = document.getElementById("status");
const profileSection = document.getElementById("profileSection");
const profileCard = document.getElementById("profileCard");
const repoGrid = document.getElementById("repoGrid");
const repoCount = document.getElementById("repoCount");

const battleForm = document.getElementById("battleForm");
const playerOneInput = document.getElementById("playerOne");
const playerTwoInput = document.getElementById("playerTwo");
const battleStatus = document.getElementById("battleStatus");
const battleResults = document.getElementById("battleResults");

const themeToggle = document.getElementById("themeToggle");

const API_URL = "https://api.github.com";


// Format large numbers like 1200 into 1.2K
function formatNumber(number) {
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(number ?? 0);
}


// Format date for displaying on the page
function formatDate(date) {
    if (!date) {
        return "Unknown";
    }

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


// Display status messages
function showStatus(element, message, type = "") {
    element.textContent = message;
    element.className = `status ${type}`.trim();
}


// Clear status messages
function hideStatus(element) {
    element.textContent = "";
    element.className = "status hidden";
}


// Escape API text before adding it to HTML
function escapeHTML(value = "") {
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, function (character) {
        return entities[character];
    });
}


// Allow only HTTP and HTTPS links
function safeURL(value) {
    try {
        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

        return "#";
    } catch {
        return "#";
    }
}


// Get data from the GitHub API
async function fetchGitHub(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            Accept: "application/vnd.github+json"
        }
    });

    if (response.status === 404) {
        throw new Error("GitHub user or resource not found.");
    }

    if (response.status === 403 || response.status === 429) {
        throw new Error(
            "GitHub API rate limit reached. Please try again later."
        );
    }

    if (!response.ok) {
        throw new Error(`Something went wrong. Status: ${response.status}`);
    }

    return response.json();
}


// Get a user's profile and recent repositories
async function getDeveloper(username) {
    username = username.trim();

    if (!username) {
        throw new Error("Please enter a GitHub username.");
    }

    const user = await fetchGitHub(
        `/users/${encodeURIComponent(username)}`
    );

    const repos = await fetchGitHub(
        `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=5`
    );

    return {
        user: user,
        repos: repos
    };
}


// Show the developer's profile and repositories
function renderProfile(user, repos) {
    const name = escapeHTML(user.name || user.login);
    const bio = escapeHTML(
        user.bio || "This developer hasn't added a bio yet."
    );
    const location = escapeHTML(
        user.location || "Location not specified"
    );
    const company = escapeHTML(
        user.company || "Independent developer"
    );

    let website = "";

    if (user.blog) {
        const blog = user.blog.trim();
        const blogURL = /^https?:\/\//i.test(blog)
            ? blog
            : `https://${blog}`;

        website = safeURL(blogURL);
    }

    let websiteHTML = "";

    if (website && website !== "#") {
        websiteHTML = `
            <a href="${website}" target="_blank"
                rel="noopener noreferrer">
                🔗 Website
            </a>
        `;
    }

    profileCard.innerHTML = `
        <div class="profile-card">
            <img
                class="avatar"
                src="${safeURL(user.avatar_url)}"
                alt="${name}'s avatar"
            >

            <div>
                <h2 class="profile-name">${name}</h2>

                <a
                    class="username"
                    href="${safeURL(user.html_url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @${escapeHTML(user.login)}
                </a>

                <p class="bio">${bio}</p>

                <div class="profile-meta">
                    <span>📍 ${location}</span>
                    <span>🏢 ${company}</span>
                    <span>📅 Joined ${formatDate(user.created_at)}</span>
                    ${websiteHTML}
                </div>

                <div class="stats">
                    <div class="stat">
                        <strong>${formatNumber(user.public_repos)}</strong>
                        <span>Repositories</span>
                    </div>

                    <div class="stat">
                        <strong>${formatNumber(user.followers)}</strong>
                        <span>Followers</span>
                    </div>

                    <div class="stat">
                        <strong>${formatNumber(user.following)}</strong>
                        <span>Following</span>
                    </div>

                    <div class="stat">
                        <strong>${formatNumber(user.public_gists)}</strong>
                        <span>Public gists</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    repoCount.textContent = `${repos.length} shown`;

    if (repos.length === 0) {
        repoGrid.innerHTML = `
            <p class="status">No public repositories found.</p>
        `;
        return;
    }

    repoGrid.innerHTML = repos.map(function (repo) {
        return `
            <article class="repo-card">
                <a
                    class="repo-title"
                    href="${safeURL(repo.html_url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ↗ ${escapeHTML(repo.name)}
                </a>

                <p class="repo-description">
                    ${escapeHTML(
                        repo.description || "No description provided."
                    )}
                </p>

                <div class="repo-meta">
                    <span class="repo-language">
                        ● ${escapeHTML(repo.language || "Not specified")}
                    </span>

                    <span>⭐ ${formatNumber(repo.stargazers_count)}</span>
                    <span>⑂ ${formatNumber(repo.forks_count)}</span>
                </div>

                <div class="repo-meta">
                    <span>Updated ${formatDate(repo.updated_at)}</span>
                </div>
            </article>
        `;
    }).join("");
}


// Search for a GitHub user
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const button = searchForm.querySelector("button");

    if (!username) {
        showStatus(statusBox, "Please enter a GitHub username.", "error");
        return;
    }

    hideStatus(statusBox);
    profileSection.classList.add("hidden");

    showStatus(statusBox, "Searching GitHub... Please wait.");

    button.disabled = true;
    button.textContent = "Searching...";

    try {
        const result = await getDeveloper(username);

        renderProfile(result.user, result.repos);

        hideStatus(statusBox);
        profileSection.classList.remove("hidden");
    } catch (error) {
        showStatus(statusBox, error.message, "error");
    } finally {
        button.disabled = false;
        button.textContent = "Search Profile ↗";
    }
});


// Calculate total stars from all public repositories
async function getTotalStars(username, repoCount) {
    let totalStars = 0;

    const perPage = 100;
    const totalPages = Math.ceil(repoCount / perPage);

    for (let page = 1; page <= totalPages; page++) {
        const repos = await fetchGitHub(
            `/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}`
        );

        for (const repo of repos) {
            totalStars += repo.stargazers_count;
        }
    }

    return totalStars;
}


// Get profile details and total stars for a battle
async function getBattleData(username) {
    const result = await getDeveloper(username);

    const totalStars = await getTotalStars(
        username,
        result.user.public_repos
    );

    return {
        user: result.user,
        totalStars: totalStars
    };
}


// Create a battle card for a developer
function renderBattleCard(data, isWinner) {
    const user = data.user;
    const totalStars = data.totalStars;

    let winnerLabel = "";

    if (isWinner) {
        winnerLabel = `
            <span class="winner-label">★ STAR LEADER</span>
        `;
    }

    return `
        <article class="battle-card ${isWinner ? "winner" : ""}">
            <div class="battle-top">
                <img
                    src="${safeURL(user.avatar_url)}"
                    alt="${escapeHTML(user.login)} avatar"
                >

                <div>
                    <h3>${escapeHTML(user.login)}</h3>
                    ${winnerLabel}
                </div>
            </div>

            <div class="battle-stat">
                <span>Total public stars</span>
                <strong>${formatNumber(totalStars)}</strong>
            </div>

            <div class="battle-stat">
                <span>Public repositories</span>
                <strong>${formatNumber(user.public_repos)}</strong>
            </div>

            <div class="battle-stat">
                <span>Followers</span>
                <strong>${formatNumber(user.followers)}</strong>
            </div>

            <div class="battle-stat">
                <span>Following</span>
                <strong>${formatNumber(user.following)}</strong>
            </div>

            <div class="battle-stat">
                <span>Account created</span>
                <strong>${formatDate(user.created_at)}</strong>
            </div>
        </article>
    `;
}


// Compare two GitHub developers
battleForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usernameOne = playerOneInput.value.trim();
    const usernameTwo = playerTwoInput.value.trim();
    const button = battleForm.querySelector("button");

    if (!usernameOne || !usernameTwo) {
        showStatus(battleStatus, "Enter both GitHub usernames.", "error");
        return;
    }

    if (usernameOne.toLowerCase() === usernameTwo.toLowerCase()) {
        showStatus(
            battleStatus,
            "Choose two different GitHub users to start a battle.",
            "error"
        );
        return;
    }

    hideStatus(battleStatus);
    battleResults.innerHTML = "";

    showStatus(
        battleStatus,
        "Fetching profiles and calculating total stars..."
    );

    button.disabled = true;
    button.textContent = "Battling...";

    try {
        // Fetch both developers at the same time
        const results = await Promise.all([
            getBattleData(usernameOne),
            getBattleData(usernameTwo)
        ]);

        const first = results[0];
        const second = results[1];

        const firstWins = first.totalStars > second.totalStars;
        const secondWins = second.totalStars > first.totalStars;

        battleResults.innerHTML =
            renderBattleCard(first, firstWins) +
            renderBattleCard(second, secondWins);

        if (first.totalStars === second.totalStars) {
            showStatus(
                battleStatus,
                "It's a draw! Both developers have the same total stars.",
                "success"
            );
        } else {
            const winner = firstWins
                ? first.user.login
                : second.user.login;

            showStatus(
                battleStatus,
                `${winner} wins by total public stars!`,
                "success"
            );
        }
    } catch (error) {
        showStatus(battleStatus, error.message, "error");
    } finally {
        button.disabled = false;
        button.textContent = "Start Battle ⚔";
    }
});


// Switch between light and dark themes
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light");

    const lightMode = document.body.classList.contains("light");

    themeToggle.textContent = lightMode ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        lightMode ? "Switch to dark theme" : "Switch to light theme"
    );
});
