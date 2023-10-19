import User from '@/models/User'
import users from './UsersDummyData'

class UsersStore {
  private users: User[] = []

  constructor() {
    if (typeof window !== "undefined") {
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]')
      // Replace users with users from localStorage
      const mergedUsers = localUsers.concat(users.filter((user: User) => !localUsers.some((localUser : User) => localUser.id === user.id)))
      this.users = mergedUsers
    }
  }

  private save(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem('users', JSON.stringify(this.users))
    }
  }

  create(user: User) {
    this.users.push(user)
    this.save()
  }

  read(): User[] {
    return [...this.users]
  }

  update(id: string, updatedUser: Partial<User>) {
    const index = this.users.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser }
      this.save()
    }
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id)
    this.save()
  }
}

export default UsersStore
