// On user
// POST/Create method
const { username, email, password, dob } = req.body;
try {
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }
  const newUser = new User({
    username,
    email,
    password,
    dob,
  });
  await newUser.save();
  res.json({ user: newUser });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Server Error");
}
// Read/ GET method
const getAllUsers = async () => {
 try {
 const users = await User.find();
 return users;
 } catch (error) {
 console.error('Error fetching all users:', error);
 throw new Error('Failed to fetch all users');
 }
};
// PUT/ Update method
const updateUserById = async (userId, userData) => {
 try {
 const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
 return updatedUser;
 } catch (error) {
 console.error('Error updating user by ID:', error);
 throw new Error('Failed to update user by ID');
 }
};
// Delete method
const deleteUserById = async (userId) => {
 try {
 // Placeholder logic to delete a user by ID
 await User.findByIdAndDelete(userId);
 } catch (error) {
 // Handle errors
 console.error('Error deleting user by ID:', error);
 throw new Error('Failed to delete user by ID');
 }
// On policy
// Create/ POST 
const createPolicy = async (policyData) => {
 try {
 const newPolicy = new Policy(policyData);
 const savedPolicy = await newPolicy.save();
 return savedPolicy;
 } catch (error) {
 throw new Error('Could not create policy: ' + error.message);
 }
// Read/GET
const getAllPolicies = async () => {
 try {
 const policies = await Policy.find();
 return policies;
 } catch (error) {
 throw new Error('Could not fetch policies: ' + error.message);
// Update/PUT
const updatePolicyById = async (policyId, updatedPolicyData) => {
 try {
 const policy = await Policy.findByIdAndUpdate(policyId, updatedPolicyData, { new: true });
 if (!policy) {
 throw new Error('Policy not found');
 }
 return policy;
 } catch (error) {
 throw new Error('Could not update policy: ' + error.message);
 }
};
// Delete
const deletePolicyById = async (policyId) => {
 try {
 const policy = await Policy.findByIdAndDelete(policyId);
 if (!policy) {
 throw new Error('Policy not found');
 }
 return { message: 'Policy deleted successfully' };
 } catch (error) {
 throw new Error('Could not delete policy: ' + error.message);
 }
};
// On claim
// Create/POST
const createClaim = async (claimData) => {
 try {
 const { userId, policyId, amount } = claimData;
 // Check if the user exists
 const user = await User.findById(userId);
 if (!user) {
 throw new Error("User does not exist");
 }
 // Find the policy in the user's policies array
 const userPolicy = user.policies.find(
 (policy) => policy.policyId.toString() === policyId.toString()
 );
 if (!userPolicy) {
 throw new Error("Policy does not exist for the user");
 }
 // Create the claim
 const newClaim = new Claim(claimData);
 const savedClaim = await newClaim.save();
 return savedClaim;
 } catch (error) {
 throw new Error("Could not create claim: " + error.message);
 }
};
// Read/GET
exports.getAllClaims = async () => {
 try {
 const claims = await Claim.find();
 return claims;
 } catch (error) {
 throw new Error("Error fetching all claims: " + error.message);
 }
};
Update/PUT
exports.updateClaimById = async (claimId, updatedClaimData) => {
 try {
 // Extract userId, policyId, and status from updatedClaimData
 const { userId, policyId, status, amount } = updatedClaimData;
 // Check if the user exists
 const user = await User.findById(userId);
 if (!user) {
 throw new Error("User does not exist");
 }
// Check if policy exists
const policy = await Policy.findById(policyId);
 if (!policy) {
 throw new Error("Policy does not exist");
 }
 // Check if the claim exists
 const claim = await Claim.findById(claimId);
 if (!claim) {
 throw new Error("Claim does not exist");
 }
 // Validate the status field
 const allowedStatusValues = ["pending", "approved", "rejected"];
 if (status && !allowedStatusValues.includes(status)) {
 throw new Error("Invalid status value");
 }
 // If the status is approved, deduct the claim amount from the policy's claimable amount
 if (status === "approved") {
 // Find the policy object within the user's policies array that matches the policy ID of the approved claim
 const policyIndex = user.policies.findIndex(
 (p) => p.policyId.toString() === policyId
 );
 if (policyIndex === -1) {
 throw new Error("Policy not found in user's policies");
 }
 // Deduct the claim amount from the policy's claimable amount
 user.totalClaimAmount += amount;
 user.policies[policyIndex].claimableAmount -= amount;
 // Save the updated user data
 await user.save();
 }
 // Update the claim
 const updatedClaim = await Claim.findByIdAndUpdate(
 claimId,
 updatedClaimData,
 { new: true }
 );
 return updatedClaim;
 } catch (error) {
 throw new Error("Could not update claim: " + error.message);
 }
};
// Delete:
exports.deleteClaimById = async (claimId) => {
 try {
 // Check if the claim exists
 const claim = await Claim.findById(claimId);
 if (!claim) {
 throw new Error("Claim does not exist");
 }
 // Delete the claim
 await Claim.findByIdAndDelete(claimId);
 } catch (error) {
 throw new Error("Could not delete claim: " + error.message);
 }
 
