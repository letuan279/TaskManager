const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const config = require('../configs/config.mongodb')
const fs = require('fs')

const User = require('../models/user.model');
const Category = require('../models/category.model');
const Task = require('../models/task.model');
const Notification = require('../models/notification.model');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const generateSeedData = async () => {
    try {
        await mongoose.connect(config.db.url)

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Task.deleteMany();
        await Notification.deleteMany();

        // Create dummy users
        const users = [];
        for (let i = 0; i < 5; i++) {
            const user = new User({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            });
            await user.save();
            users.push(user);
        }

        // Create dummy categories
        const categories = [];
        for (let i = 0; i < 3; i++) {
            const category = new Category({
                name: faker.word.noun(),
                color: faker.color.human(),
                user: users[Math.floor(Math.random() * users.length)]._id,
            });
            await category.save();
            categories.push(category);
        }

        // Create dummy tasks
        for (let i = 0; i < 10; i++) {
            const task = new Task({
                name: faker.lorem.words(3),
                start_day: faker.date.future(),
                end_day: faker.date.future(),
                color: faker.color.human(),
                user: users[Math.floor(Math.random() * users.length)]._id,
                category: categories[Math.floor(Math.random() * categories.length)]._id,
                status: faker.datatype.number({ min: 1, max: 3 }),
                priority: faker.datatype.number({ min: 1, max: 3 }),
            });
            await task.save();
        }

        // Create dummy notifications
        for (let i = 0; i < 5; i++) {
            const notification = new Notification({
                content: faker.lorem.sentence(),
                task: await Task.findOne().select('_id'),
            });
            await notification.save();
        }

        console.log('Seed data created successfully');
    } catch (error) {
        console.error('Error creating seed data:', error);
    } finally {
        // Close the MongoDB connection
        mongoose.disconnect();
    }
};

generateSeedData();
