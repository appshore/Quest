// Only the info that we want to send to the client
const filterUserProfile = user => ({
  username: user.username
});

export { filterUserProfile };
