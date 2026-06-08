const prisma = require('../lib/prisma');

// No-auth middleware: always injects a default user so routes work without login
const protect = async (req, res, next) => {
  try {
    // Find the first user in the database to use as the default user
    const user = await prisma.user.findFirst({
      orderBy: { createdAt: 'asc' }
    });

    if (!user) {
      return res.status(500).json({ message: 'No users in database. Please run: npm run seed' });
    }

    const { password, ...userWithoutPassword } = user;
    req.user = {
      ...userWithoutPassword,
      _id: user.id
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { protect };
