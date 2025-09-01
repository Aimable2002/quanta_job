import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test 1: Contact form submission
    console.log('1️⃣ Testing contact form submission...');
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message',
      message: 'This is a test message from the API test script'
    };

    const contactResponse = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    if (contactResponse.ok) {
      const contactResult = await contactResponse.json();
      console.log('✅ Contact created successfully:', contactResult._id);
    } else {
      console.log('❌ Contact creation failed:', contactResponse.status);
    }

    // Test 2: Admin registration
    console.log('\n2️⃣ Testing admin registration...');
    const adminData = {
      username: 'testadmin',
      password: 'testpassword123'
    };

    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminData)
    });

    if (registerResponse.ok) {
      const registerResult = await registerResponse.json();
      console.log('✅ Admin registered successfully, token received');
      
      // Test 3: Admin login
      console.log('\n3️⃣ Testing admin login...');
      const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      });

      if (loginResponse.ok) {
        const loginResult = await loginResponse.json();
        console.log('✅ Admin login successful, token received');
        
        // Test 4: Fetch contacts with auth
        console.log('\n4️⃣ Testing contacts fetch with authentication...');
        const contactsResponse = await fetch(`${API_BASE}/api/contact`, {
          headers: {
            'x-auth-token': loginResult.token,
            'Content-Type': 'application/json'
          }
        });

        if (contactsResponse.ok) {
          const contacts = await contactsResponse.json();
          console.log(`✅ Contacts fetched successfully: ${contacts.length} contacts found`);
        } else {
          console.log('❌ Contacts fetch failed:', contactsResponse.status);
        }
      } else {
        console.log('❌ Admin login failed:', loginResponse.status);
      }
    } else {
      console.log('❌ Admin registration failed:', loginResponse.status);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }

  console.log('\n🏁 API testing completed!');
}

testAPI();
