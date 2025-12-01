document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api';

    // Donor Registration
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registrationForm);
            const donorData = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch(`${apiUrl}/donors`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(donorData)
                });
                const result = await response.json();
                const messageEl = document.getElementById('message');
                if (response.ok) {
                    messageEl.textContent = 'Registration successful!';
                    messageEl.style.color = 'green';
                    registrationForm.reset();
                } else {
                    messageEl.textContent = `Error: ${result.error}`;
                    messageEl.style.color = 'red';
                }
            } catch (error) {
                document.getElementById('message').textContent = `Error: ${error.message}`;
            }
        });
    }

    // Find Donors
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const bloodGroup = document.getElementById('blood_group').value;
            const city = document.getElementById('city').value;
            
            try {
                const response = await fetch(`${apiUrl}/donors/search?bloodGroup=${bloodGroup}&city=${city}`);
                const donors = await response.json();
                const resultsDiv = document.getElementById('donor-results');
                resultsDiv.innerHTML = '';
                if (donors.length > 0) {
                    donors.forEach(donor => {
                        const card = document.createElement('div');
                        card.className = 'donor-card';
                        card.innerHTML = `
                            <h4>${donor.name}</h4>
                            <p><strong>Blood Group:</strong> ${donor.blood_group}</p>
                            <p><strong>Phone:</strong> ${donor.phone}</p>
                            <p><strong>City:</strong> ${donor.city}</p>
                            <p><strong>Last Donated:</strong> ${donor.last_donation_date ? new Date(donor.last_donation_date).toLocaleDateString() : 'N/A'}</p>
                        `;
                        resultsDiv.appendChild(card);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No donors found.</p>';
                }
            } catch (error) {
                document.getElementById('donor-results').innerHTML = `<p>Error: ${error.message}</p>`;
            }
        });
    }

    // Admin Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${apiUrl}/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const result = await response.json();
                if (result.success) {
                    document.getElementById('admin-login').style.display = 'none';
                    document.getElementById('admin-dashboard').style.display = 'block';
                    loadDonors();
                } else {
                    document.getElementById('login-message').textContent = 'Invalid credentials';
                }
            } catch (error) {
                document.getElementById('login-message').textContent = `Error: ${error.message}`;
            }
        });
    }
    
    // Load Donors in Admin Dashboard
    async function loadDonors() {
        try {
            const response = await fetch(`${apiUrl}/donors`);
            const donors = await response.json();
            const tableBody = document.querySelector('#donors-table tbody');
            tableBody.innerHTML = '';
            donors.forEach(donor => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${donor.name}</td>
                    <td>${donor.age}</td>
                    <td>${donor.gender}</td>
                    <td>${donor.blood_group}</td>
                    <td>${donor.phone}</td>
                    <td>${donor.email}</td>
                    <td>${donor.city}</td>
                    <td>${donor.last_donation_date ? new Date(donor.last_donation_date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                        <button class="btn" onclick="editDonor(${donor.id})">Edit</button>
                        <button class="btn" onclick="deleteDonor(${donor.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading donors:', error);
        }
    }

    // Edit and Delete functionality need to be wired up
    window.editDonor = (id) => {
        // Implement edit functionality - e.g., open a modal with a form
        alert(`Editing donor ${id}`);
    };

    window.deleteDonor = async (id) => {
        if (confirm('Are you sure you want to delete this donor?')) {
            try {
                const response = await fetch(`${apiUrl}/donors/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    loadDonors(); // Refresh the table
                } else {
                    alert('Failed to delete donor.');
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    };
});
