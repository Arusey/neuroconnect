document.addEventListener('DOMContentLoaded', function() {
    const webinars = [
        {
            title: "Understanding Autism and Neurodiversity",
            date: new Date(2024, 2, 22), // March 22nd
            time: "6:00 PM - 8:00 PM",
            category: "Parent Training",
            description: "Free introductory webinar on autism awareness and understanding neurodiversity",
            price: "FREE"
        },
        {
            title: "Nanny Training Session",
            date: new Date(2024, 2, 26), // March 26th (Tuesday)
            time: "10:00 AM - 12:00 PM",
            category: "Professional Training",
            description: "Essential training for nannies working with neurodivergent children",
            price: "350 KES"
        },
        {
            title: "Parent Support Group",
            date: new Date(2024, 2, 27), // March 27th (Wednesday)
            time: "6:00 PM - 8:00 PM",
            category: "Parent Support",
            description: "Interactive session for parents to share experiences and learn strategies",
            price: "350 KES"
        },
        {
            title: "Nanny Training Session",
            date: new Date(2024, 2, 30), // March 30th (Saturday)
            time: "2:00 PM - 4:00 PM",
            category: "Professional Training",
            description: "Essential training for nannies working with neurodivergent children",
            price: "350 KES"
        },
        {
            title: "Parent Support Session",
            date: new Date(2024, 2, 31), // March 31st (Sunday)
            time: "2:00 PM - 6:00 PM",
            category: "Parent Support",
            description: "Extended support session focusing on behavior management techniques",
            price: "350 KES"
        }
    ];

    function displayWebinars() {
        const scheduleContainer = document.getElementById('webinar-schedule');
        if (!scheduleContainer) return;

        // Clear existing content
        scheduleContainer.innerHTML = '';

        // Create table
        const table = document.createElement('table');
        table.className = 'min-w-full divide-y divide-gray-200';

        // Create table header
        const thead = document.createElement('thead');
        thead.className = 'bg-gray-50';
        thead.innerHTML = `
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        tbody.className = 'bg-white divide-y divide-gray-200';

        webinars.forEach((webinar, index) => {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';

            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = webinar.date.toLocaleDateString('en-US', dateOptions);

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${formattedDate}</div>
                    <div class="text-sm text-gray-500">${webinar.time}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">${webinar.title}</div>
                    <div class="text-sm text-gray-500">${webinar.description}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${webinar.category}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${webinar.price}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="schedule-register-btn bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-2 px-4 rounded-full transition"
                            data-webinar="${webinar.title}"
                            data-date="${formattedDate}"
                            data-time="${webinar.time}">
                        Register
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        scheduleContainer.appendChild(table);

        // Add payment information
        const paymentInfo = document.createElement('div');
        paymentInfo.className = 'mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-[#1877f2]';
        paymentInfo.innerHTML = `
            <h4 class="text-lg font-bold mb-4">Payment Information</h4>
            <p class="mb-2">Webinar Fee: <span class="font-bold">350 KES per session</span></p>
            <p class="mb-4">March 22nd Introductory Webinar: <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">FREE</span></p>
            <div class="bg-white p-4 rounded-lg">
                <h5 class="font-semibold mb-2">How to Pay:</h5>
                <ol class="list-decimal ml-5 space-y-2">
                    <li>Send payment via M-PESA to <span class="font-bold">+254 723 876047</span></li>
                    <li>Include your name and "Webinar" in the payment reference</li>
                    <li>Forward M-PESA confirmation to <a href="mailto:hello@neuroconnectclub.com" class="text-[#1877f2] hover:underline">hello@neuroconnectclub.com</a></li>
                    <li>You'll receive access details within 24 hours</li>
                </ol>
            </div>
        `;
        // scheduleContainer.appendChild(paymentInfo);

        // Add contact information
        const contactInfo = document.createElement('div');
        contactInfo.className = 'mt-6 pt-4 border-t border-gray-200';
        contactInfo.innerHTML = `
            <h4 class="font-bold mb-2">More Information</h4>
            <p>Phone: +254 715 233788</p>
            <p>Email: hello@neuroconnectclub.com</p>
        `;
        scheduleContainer.appendChild(contactInfo);
    }

    // Call the function to display webinars
    displayWebinars();

    // Registration form functionality for the schedule table
    const scheduleRegisterButtons = document.querySelectorAll('.schedule-register-btn');
    scheduleRegisterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const webinarTitle = this.getAttribute('data-webinar');
            const webinarDate = this.getAttribute('data-date');
            const webinarTime = this.getAttribute('data-time');
            
            // Redirect to the webinar registration page with the webinar title as a parameter
            window.location.href = `webinar-registration.html?webinar=${encodeURIComponent(webinarTitle)}`;
        });
    });

    /* 
    // Commenting out the conflicting code that interferes with the main registration form
    const modal = createRegistrationModal();
    const closeModal = document.getElementById('close-modal');
    const registrationForm = document.getElementById('registration-form');

    // Update register button click handlers
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const webinarTitle = this.getAttribute('data-webinar');
            const webinarDate = this.getAttribute('data-date');
            const webinarTime = this.getAttribute('data-time');
            
            // Set hidden fields
            document.getElementById('webinar-title').value = webinarTitle;
            document.getElementById('webinar-date').value = webinarDate;
            document.getElementById('webinar-time').value = webinarTime;
            
            // Show modal
            modal.classList.remove('hidden');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Handle form submission
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            webinarTitle: document.getElementById('webinar-title').value,
            webinarDate: document.getElementById('webinar-date').value,
            webinarTime: document.getElementById('webinar-time').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            paymentReference: document.getElementById('payment-reference').value
        };

        try {
            // Replace with your Google Apps Script URL
            const response = await fetch('https://script.google.com/a/macros/neuroconnectclub.com/s/AKfycbzaYbbXO_6KR6bPSlLcG9EafDSV4bngGeo7i-Cjp2ETEQREXs9Gk70io3RQWBqew9mA6Q/exec', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.status === 'success') {
                alert('Registration successful! We will send you the webinar details shortly.');
                modal.classList.add('hidden');
                registrationForm.reset();
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
    });
    */
});

/*
function createRegistrationModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 hidden';
    modal.id = 'registration-modal';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 class="text-2xl font-bold mb-4">Webinar Registration</h3>
            <form id="registration-form" class="space-y-4">
                <input type="hidden" id="webinar-title">
                <input type="hidden" id="webinar-date">
                <input type="hidden" id="webinar-time">
                
                <div>
                    <label class="block text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
                
                <div>
                    <label class="block text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
                
                <div>
                    <label class="block text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" id="phone" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
                
                <div>
                    <label class="block text-gray-700 mb-2">M-PESA Payment Reference</label>
                    <input type="text" id="payment-reference" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md">
                </div>
                
                <div class="flex justify-between mt-6">
                    <button type="button" id="close-modal"
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">
                        Cancel
                    </button>
                    <button type="submit"
                            class="bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-2 px-4 rounded-full">
                        Submit Registration
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}
*/ 