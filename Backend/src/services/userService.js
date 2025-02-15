const { User } = require('../models');
const { Op } = require('sequelize');

class UserService {
    static async getUserProfile(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: User,
                        as: 'followers',
                        attributes: ['id', 'username', 'avatar'],
                        through: { attributes: [] }
                    },
                    {
                        model: User,
                        as: 'following',
                        attributes: ['id', 'username', 'avatar'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Format the response
            const userProfile = {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                bio: user.bio,
                title: user.title || 'Member',
                skills: user.skills || [],
                stats: {
                    followers: user.followers?.length || 0,
                    following: user.following?.length || 0,
                    projects: 0, // You can add project count here if you have projects
                    likes: 0 // You can add likes count here if you have likes
                }
            };

            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(userId, updateData) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Remove sensitive fields from update data
            delete updateData.password;
            delete updateData.email; // If you want to handle email updates separately

            await user.update(updateData);
            return await this.getUserProfile(userId);
        } catch (error) {
            throw error;
        }
    }

    static async searchUsers(query) {
        try {
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { username: { [Op.iLike]: `%${query}%` } },
                        { email: { [Op.iLike]: `%${query}%` } }
                    ]
                },
                attributes: { exclude: ['password'] }
            });
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async toggleFollowUser(followerId, followingId) {
        try {
            const [follower, following] = await Promise.all([
                User.findByPk(followerId),
                User.findByPk(followingId)
            ]);

            if (!follower || !following) {
                throw new Error('User not found');
            }

            const isFollowing = await follower.hasFollowing(following);
            if (isFollowing) {
                await follower.removeFollowing(following);
            } else {
                await follower.addFollowing(following);
            }

            return { success: true, action: isFollowing ? 'unfollowed' : 'followed' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;