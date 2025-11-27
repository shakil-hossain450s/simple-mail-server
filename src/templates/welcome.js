module.exports = (variables = {}) => {
  const name = variables.username || 'User';
  return `<h2>Welcome, ${name}!</h2>
          <p>Thanks for joining us.</p>`;
};