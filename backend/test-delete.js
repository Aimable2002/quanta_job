import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000';

async function testDelete() {
  console.log('🧪 Testing delete functionality...\n');

  try {
    // Step 1: Create a test contact
    console.log('1️⃣ Creating test contact...');
    const contactData = {
      name: 'Test Delete User',
      email: 'delete@test.com',
      subject: 'Test for Delete',
      message: 'This contact will be deleted'
    };

    const createResponse = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    if (!createResponse.ok) {
      console.log('❌ Failed to create test contact:', createResponse.status);
      return;
    }

    const createdContact = await createResponse.json();
    console.log('✅ Test contact created:', createdContact._id);

    // Step 2: Register admin and get token
    console.log('\n2️⃣ Registering admin...');
    const adminData = {
      username: 'deletetest',
      password: 'testpassword123'
    };

    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminData)
    });

    if (!registerResponse.ok) {
      console.log('❌ Admin registration failed:', registerResponse.status);
      return;
    }

    const { token } = await registerResponse.json();
    console.log('✅ Admin registered, token received');

    // Step 3: Fetch contacts to verify
    console.log('\n3️⃣ Fetching contacts...');
    const fetchResponse = await fetch(`${API_BASE}/api/contact`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      }
    });

    if (!fetchResponse.ok) {
      console.log('❌ Failed to fetch contacts:', fetchResponse.status);
      return;
    }

    const contacts = await fetchResponse.json();
    console.log(`✅ Found ${contacts.length} contacts`);

    // Step 4: Delete the test contact
    console.log('\n4️⃣ Deleting test contact...');
    const deleteResponse = await fetch(`${API_BASE}/api/contact/${createdContact._id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      }
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json().catch(() => ({}));
      console.log('❌ Delete failed:', deleteResponse.status, errorData);
      return;
    }

    const deleteResult = await deleteResponse.json();
    console.log('✅ Contact deleted successfully:', deleteResult);

    // Step 5: Verify contact was deleted
    console.log('\n5️⃣ Verifying deletion...');
    const verifyResponse = await fetch(`${API_BASE}/api/contact`, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      }
    });

    if (!verifyResponse.ok) {
      console.log('❌ Failed to verify deletion:', verifyResponse.status);
      return;
    }

    const remainingContacts = await verifyResponse.json();
    console.log(`✅ Remaining contacts: ${remainingContacts.length}`);

    if (remainingContacts.length === contacts.length - 1) {
      console.log('✅ Deletion verified successfully!');
    } else {
      console.log('❌ Deletion verification failed');
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }

  console.log('\n🏁 Delete testing completed!');
}

testDelete();
