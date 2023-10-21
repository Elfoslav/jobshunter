import Skill from '@/models/Skill'
import skills from './SkillsDummyData'
import GeneralStore from '../GeneralStore'

const Store = new GeneralStore<Skill>('skills', skills)

export default Store