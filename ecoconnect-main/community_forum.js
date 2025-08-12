document.addEventListener('DOMContentLoaded', () => {

    // --- Simulated Data ---
    let userPoints = 0; // Tracks user's points
    let totalTreesPlanted = 5230;
    let totalCO2Reduced = 15700;
    let totalEventsJoined = 2150;

    const eventsData = [
        {
            id: 'event-1',
            image: 'Community_Tree_Planting_Drive.jpg',
            title: 'Community Tree Planting Drive',
            date: 'August 10, 2025',
            location: 'Eco Park, Sector 24, Delhi',
            impact: 'Est. 500 trees planted, ~10 tons CO2 absorbed/year.',
            description: `Join us for a day of nature and community spirit as we plant saplings to expand our urban green cover. This initiative aims to improve air quality, support local biodiversity, and provide a greener space for everyone.
            <br><br><strong>What to bring:</strong> Comfortable shoes, water bottle, gardening gloves (if you have them). Tools will be provided.
            <br><strong>How it works:</strong> Volunteers will be guided by experienced arborists. We'll learn about native tree species and proper planting techniques.
            <br><strong>Real impact:</strong> Each tree planted contributes significantly to long-term carbon sequestration and enhances the ecological balance of our city.`
        },
        {
            id: 'event-2',
            image: 'Beach_Cleanup_Drive.jpg',
            title: 'Beach Cleanup Drive',
            date: 'August 25, 2025',
            location: 'Yamuna Riverbank, Okhla',
            impact: 'Target: 800 kg plastic/waste removal, protecting aquatic life.',
            description: `Help us keep our riverfront clean and healthy! This cleanup drive focuses on removing plastic waste and debris from the Yamuna riverbank, preventing pollution from reaching larger water bodies.
            <br><br><strong>What to bring:</strong> Reusable gloves, water bottle, sun protection. Bags will be provided.
            <br><strong>How it works:</strong> We'll divide into teams to cover designated sections of the riverbank. Safety briefings will be held.
            <br><strong>Real impact:</strong> Directly reduces plastic pollution, safeguards wildlife, and improves the aesthetic appeal of our local natural spaces. Recycling collected waste is a priority.`
        },
        {
            id: 'event-3',
            image: 'Home_Composting_Workshop.jpg',
            title: 'Home Composting Workshop',
            date: 'September 5, 2025',
            location: 'Community Hall, Green Valley',
            impact: 'Learn to divert 30% of household waste from landfills.',
            description: `Discover the simple and effective way to turn your kitchen and garden waste into rich compost. This workshop will cover various composting methods suitable for urban homes, reducing landfill waste and creating natural fertilizer.
            <br><br><strong>What to expect:</strong> Hands-on demonstration, Q&A session with a composting expert.
            <br><strong>How it works:</strong> We'll discuss bin types, what to compost, troubleshooting common issues, and how to use your finished compost.
            <br><strong>Real impact:</strong> Reduces methane emissions from landfills, enriches soil naturally, and decreases reliance on chemical fertilizers. Practical, everyday carbon reduction!`
        }
    ];

    // --- DOM Elements ---
    const eventListDiv = document.querySelector('.event-list');
    const userPointsSpan = document.getElementById('user-points');
    const totalTreesSpan = document.getElementById('trees-planted');
    const totalCO2Span = document.getElementById('co2-reduced');
    const totalEventsSpan = document.getElementById('events-joined');
    const postCommentBtn = document.getElementById('post-comment-btn');
    const commentAuthorInput = document.getElementById('comment-author');
    const commentTextInput = document.getElementById('comment-text');
    const commentThreadDiv = document.getElementById('comment-thread');

    // Modal elements
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    // --- Functions ---

    // Update simulated impact metrics
    const updateImpactMetrics = () => {
        totalTreesSpan.textContent = totalTreesPlanted.toLocaleString();
        totalCO2Span.textContent = totalCO2Reduced.toLocaleString();
        totalEventsSpan.textContent = totalEventsJoined.toLocaleString();
        userPointsSpan.textContent = userPoints.toLocaleString();
    };

    // Render Event Cards
    const renderEvents = () => {
        eventListDiv.innerHTML = ''; // Clear existing events
        eventsData.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Impact:</strong> ${event.impact}</p>
                    <button class="details-button" data-event-id="${event.id}">View Details</button>
                    <button class="join-button" data-event-id="${event.id}">Join Event</button>
                </div>
            `;
            eventListDiv.appendChild(eventCard);
        });
    };

    // Handle Join Event Button
    eventListDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('join-button')) {
            const button = e.target;
            const eventId = button.dataset.eventId;

            if (!button.classList.contains('joined')) {
                button.textContent = 'Joined!';
                button.classList.add('joined');
                button.disabled = true; // Disable further clicks for this session

                // Simulate points and global impact update
                userPoints += 100; // Award points for joining
                totalEventsJoined += 1; // Increment total joined events

                // Simulate specific impact based on event type
                if (eventId === 'event-1') { // Tree planting
                    totalTreesPlanted += 5;
                    totalCO2Reduced += 100;
                } else if (eventId === 'event-2') { // Beach cleanup
                    totalCO2Reduced += 50; // Simulate some generic reduction from cleanups
                } else if (eventId === 'event-3') { // Composting
                    totalCO2Reduced += 30; // Simulate reduction from knowledge gained
                }

                updateImpactMetrics();
                alert(`You have joined "${eventsData.find(e => e.id === eventId).title}" and earned 100 points!`);
            }
        } else if (e.target.classList.contains('details-button')) {
            const eventId = e.target.dataset.eventId;
            const event = eventsData.find(e => e.id === eventId);
            if (event) {
                showModal(event);
            }
        }
    });

    // Handle Post Comment Button
    postCommentBtn.addEventListener('click', () => {
        const author = commentAuthorInput.value.trim();
        const commentText = commentTextInput.value.trim();

        if (commentText.length === 0) {
            alert('Please write a comment before posting.');
            return;
        }

        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const newCommentDiv = document.createElement('div');
        newCommentDiv.classList.add('comment');
        newCommentDiv.innerHTML = `
            <p class="comment-meta"><strong>${author || 'Anonymous'}</strong> <span class="comment-date">${dateString}</span></p>
            <p class="comment-content">${commentText}</p>
            <div class="comment-actions">
                <span class="action-btn like-btn">👍 0</span>
                <span class="action-btn reply-btn">💬 0 replies</span>
            </div>
        `;
        commentThreadDiv.prepend(newCommentDiv); // Add new comment at the top

        // Clear input fields
        commentAuthorInput.value = '';
        commentTextInput.value = '';

        // Simulate points for commenting
        userPoints += 20;
        updateImpactMetrics();
        alert('Your comment has been posted (simulated)!');
    });

    // Simulate Like/Reply functionality on comments (frontend only)
    commentThreadDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-btn')) {
            let likes = parseInt(e.target.textContent.replace('👍 ', ''));
            e.target.textContent = `👍 ${likes + 1}`;
        } else if (e.target.classList.contains('reply-btn')) {
            alert('Reply feature would navigate to a detailed thread view or open a reply box (backend dependent).');
        }
    });

    // --- Modal Logic ---
    const showModal = (event) => {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Estimated Impact:</strong> ${event.impact}</p>
                <h4>About the Event:</h4>
                <p>${event.description}</p>
                <button class="join-button" data-event-id="${event.id}">Join Event</button>
            </div>
        `;
        modal.style.display = 'flex'; // Use flex to center content
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open
    };

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button') || e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        } else if (e.target.classList.contains('join-button')) {
            const eventId = e.target.dataset.eventId;
            const joinButtonOnPage = document.querySelector(`.event-card .join-button[data-event-id="${eventId}"]`);
            if (joinButtonOnPage && !joinButtonOnPage.classList.contains('joined')) {
                joinButtonOnPage.click(); // Trigger the join function on the main page button
            }
            modal.style.display = 'none'; // Close modal after joining
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // --- Initial Load ---
    updateImpactMetrics(); // Set initial values
    renderEvents(); // Display initial events
});