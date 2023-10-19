import Skill from '@/models/Skill'
import skills from './SkillsDummyData'

class SkillsStore {
  private skills: Skill[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.skills = [...skills, ...JSON.parse(localStorage.getItem('skills') || '[]')]
    }
  }

  private save(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem('skills', JSON.stringify(this.skills))
    }
  }

  create(job: Skill) {
    this.skills.push(job)
    this.save()
  }

  read(): Skill[] {
    return [...this.skills]
  }

  update(id: string, updatedjob: Partial<Skill>) {
    const index = this.skills.findIndex((job) => job.id === id)
    if (index !== -1) {
      this.skills[index] = { ...this.skills[index], ...updatedjob }
      this.save()
    }
  }

  delete(id: string) {
    this.skills = this.skills.filter((job) => job.id !== id)
    this.save()
  }
}

export default SkillsStore