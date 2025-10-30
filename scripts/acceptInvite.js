const { google } = require('googleapis');
const path = require('path');
const { promises: fs } = require('fs');

async function acceptInvitation() {
  try {
    // --- Load Service Account Key ---
    // Ensure 'service-account-key.json' is at the project root or adjust path
    const serviceAccountPath = path.resolve('./service-account-key.json');
    const serviceAccountKey = JSON.parse(await fs.readFile(serviceAccountPath, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountKey.client_email,
        private_key: serviceAccountKey.private_key,
      },
      // Scope for managing business accounts and invitations
      scopes: ['https://www.googleapis.com/auth/business.manage'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Initialize the My Business Account Management API
    const mybusinessAccountService = google.mybusinessaccountmanagement({
      version: 'v1',
      auth: authClient,
    });

    console.log('--- Attempting to list pending invitations ---');

    // --- 1. List pending invitations for the service account ---
    // The parent is typically 'accounts/'. The API lists invitations TO the authenticated account.
    const invitationsResponse = await mybusinessAccountService.accounts.invitations.list({
      parent: `accounts/${serviceAccountKey.project_id}` // Use your project ID as a placeholder, or if you know the actual account ID that received the invite
      // Note: The `parent` parameter can be a bit tricky. Sometimes it's just `accounts/`, or the account that *sent* the invite.
      // For a service account accepting its *own* invitation, just try without parent first, or iterate through known accounts if you get an error.
      // A common pattern is to list accounts first (as in the review fetch example) and then use that parent.
      // Let's try listing accounts first to get the correct parent.
    });

    let invitations = [];
    if (invitationsResponse.data && invitationsResponse.data.invitations) {
      invitations = invitationsResponse.data.invitations;
      console.log(`Found ${invitations.length} invitation(s).`);
    } else {
      console.log('No invitations found or invitationsResponse.data.invitations is undefined.');
    }


    if (invitations.length === 0) {
      console.log('No pending invitations found for this service account. Perhaps it was already accepted or not yet sent?');
      return;
    }

    // --- 2. Identify the correct invitation to accept ---
    // You might have multiple. You'll need to decide which one to accept.
    // A good way is by the target location or the inviting account.
    // For simplicity, we'll try to accept the first one found.
    const invitationToAccept = invitations[0];
    console.log('Invitation to accept:', invitationToAccept);

    // Ensure the invitation has a name (resource ID)
    if (!invitationToAccept || !invitationToAccept.name) {
      console.error('Invalid invitation object: Missing name (resource ID).');
      return;
    }

    console.log(`--- Attempting to accept invitation: ${invitationToAccept.name} ---`);

    // --- 3. Accept the invitation ---
    // The `name` is the full resource name of the invitation, e.g., 'accounts/12345/invitations/ABCD'
    await mybusinessAccountService.accounts.invitations.accept({
      name: invitationToAccept.name,
    });

    console.log('Invitation accepted successfully!');

  } catch (error) {
    console.error('Error accepting invitation:', error.message);
    if (error.code === 403) {
      console.error('Permission denied. Ensure your service account has "My Business Account Management API" enabled and the invitation was sent correctly.');
    } else if (error.code === 404) {
        console.error('Invitation not found. Check if the invitation was already accepted or if the name is incorrect.');
    }
    // Log the full error object for more details during debugging
    console.error('Full error details:', JSON.stringify(error, null, 2));
  }
}

acceptInvitation();