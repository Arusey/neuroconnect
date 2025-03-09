document.addEventListener('DOMContentLoaded', function() {
    // Updated webinar data based on the flyer
    const webinars = [
        {
            title: "Introduction to Special Needs: Understanding Different Conditions",
            date: new Date(2025, 2, 21), // March 21, 2025
            time: "4:00 PM - 6:00 PM",
            category: "Introduction"
        },
        {
            title: "Understanding Autism: Myths, Facts, and Early Signs",
            date: new Date(2025, 3, 2), // April 2, 2025
            time: "6:00 PM - 8:00 PM",
            category: "Autism Awareness"
        },
        {
            title: "Empowering Parents: Advocacy and Rights for Children with Autism",
            date: new Date(2025, 3, 5), // April 5, 2025
            time: "9:00 AM - 11:00 AM",
            category: "Parent Support"
        },
        {
            title: "Speech and Communication Strategies for Nonverbal and Verbal Children",
            date: new Date(2025, 3, 9), // April 9, 2025
            time: "6:00 PM - 8:00 PM",
            category: "Communication"
        }
        // Add more webinars as needed
    ];
    
    // Sort webinars by date
    webinars.sort((a, b) => a.date - b.date);
    
    // For demo purposes, we'll pretend today is in March 2025
    const today = new Date(2025, 2, 15); // March 15, 2025
    const upcomingWebinars = webinars.filter(webinar => webinar.date >= today);
    
    // Display the upcoming webinars
    const scheduleContainer = document.getElementById('dynamic-schedule');
    if (scheduleContainer) {
        scheduleContainer.innerHTML = '';
        
        const displayCount = Math.min(5, upcomingWebinars.length);
        
        if (displayCount === 0) {
            scheduleContainer.innerHTML = '<p class="text-gray-500">No upcoming webinars scheduled.</p>';
        } else {
            const table = document.createElement('table');
            table.className = 'w-full';
            
            // Create table header
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr class="bg-gray-100">
                    <th class="py-2 px-4 text-left">Date</th>
                    <th class="py-2 px-4 text-left">Time</th>
                    <th class="py-2 px-4 text-left">Title</th>
                    <th class="py-2 px-4 text-left">Category</th>
                </tr>
            `;
            table.appendChild(thead);
            
            // Create table body
            const tbody = document.createElement('tbody');
            
            for (let i = 0; i < displayCount; i++) {
                const webinar = upcomingWebinars[i];
                const row = document.createElement('tr');
                row.className = i % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                
                // Format date as "Mon, Apr 3"
                const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = webinar.date.toLocaleDateString('en-US', dateOptions);
                
                row.innerHTML = `
                    <td class="py-2 px-4">${formattedDate}</td>
                    <td class="py-2 px-4">${webinar.time}</td>
                    <td class="py-2 px-4">${webinar.title}</td>
                    <td class="py-2 px-4"><span class="px-2 py-1 bg-blue-100 text-[#1877f2] rounded-full text-xs">${webinar.category}</span></td>
                `;
                
                tbody.appendChild(row);
            }
            
            table.appendChild(tbody);
            scheduleContainer.appendChild(table);
            
            // Add contact information from the flyer
            const contactInfo = document.createElement('div');
            contactInfo.className = 'mt-6 pt-4 border-t border-gray-200';
            contactInfo.innerHTML = `
                <h4 class="font-bold mb-2">More Information</h4>
                <p>Phone: 0715 233788</p>
                <p>Email: hello@neuroconnectclub.com</p>
            `;
            scheduleContainer.appendChild(contactInfo);
        }
    }
    
    // Registration form functionality
    const registerButtons = document.querySelectorAll('.register-btn');
    const registerForm = document.getElementById('register-form');
    const selectedWebinar = document.getElementById('selected-webinar');
    const webinarTitleInput = document.getElementById('webinar-title');
    const cancelButton = document.getElementById('cancel-registration');
    const registrationForm = document.getElementById('webinar-registration-form');
    
    if (registerButtons.length > 0 && registerForm && selectedWebinar && webinarTitleInput) {
        // Initially scroll to the form to make it visible
        registerForm.scrollIntoView({ behavior: 'smooth' });
        
        registerButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const webinarTitle = this.getAttribute('data-webinar');
                selectedWebinar.textContent = webinarTitle;
                webinarTitleInput.value = webinarTitle;
                registerForm.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        if (cancelButton && registrationForm) {
            cancelButton.addEventListener('click', function() {
                registrationForm.reset();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // In a real application, you would send this data to a server
                alert('Thank you for registering for the webinar: ' + webinarTitleInput.value);
                registrationForm.reset();
            });
        }
    }
}); 