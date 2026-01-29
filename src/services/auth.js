// Simple local authentication service using localStorage
// This replaces Firebase authentication

class LocalAuthService {
    constructor() {
        this.USERS_KEY = 'lofi_users';
        this.CURRENT_USER_KEY = 'lofi_current_user';
    }

    // Get all users from localStorage
    getUsers() {
        const users = localStorage.getItem(this.USERS_KEY);
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    // Get current logged-in user
    getCurrentUser() {
        const user = localStorage.getItem(this.CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    // Save current user
    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.CURRENT_USER_KEY);
        }
    }

    // Sign up new user
    async signup(email, password, name) {
        const users = this.getUsers();

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            throw new Error('Email already registered');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email,
            name: name || email.split('@')[0],
            password, // In production, this should be hashed
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=random`,
            createdAt: new Date().toISOString(),
            earnings: 0,
            completedQuests: 0
        };

        users.push(newUser);
        this.saveUsers(users);

        // Auto login after signup
        const { password: _, ...userWithoutPassword } = newUser;
        this.setCurrentUser(userWithoutPassword);

        return userWithoutPassword;
    }

    // Login existing user
    async login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Don't store password in current user
        const { password: _, ...userWithoutPassword } = user;
        this.setCurrentUser(userWithoutPassword);

        return userWithoutPassword;
    }

    // Logout
    async logout() {
        this.setCurrentUser(null);
    }

    // Listen for auth state changes (simplified version)
    onAuthStateChange(callback) {
        // Check current user on init
        const currentUser = this.getCurrentUser();
        callback(currentUser);

        // Listen for storage changes (for multi-tab support)
        const handleStorageChange = (e) => {
            if (e.key === this.CURRENT_USER_KEY) {
                const user = e.newValue ? JSON.parse(e.newValue) : null;
                callback(user);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Return unsubscribe function
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }
}

export const authService = new LocalAuthService();
