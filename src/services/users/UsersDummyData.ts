import EmploymentType from "@/models/enums/EmploymentType";

const UsersDummyData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    bio: "Experienced developer looking for new opportunities.",
    location: "New York, NY",
    skills: ["JavaScript", "React", "Node.js"],
    preferences: {
      locations: ["New York, NY", "San Francisco, CA"],
      remotePercentage: 51,
      skills: ["JavaScript", "React"],
      employmentTypes: [EmploymentType.FullTime, EmploymentType.Contract],
      salaryMin: 60000,
      salaryMax: 90000,
    },
    registeredAt: new Date("2022-01-15"),
    updatedAt: new Date("2022-09-20"),
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "987-654-3210",
    bio: "Front-end developer with a passion for user interfaces.",
    location: "San Francisco, CA",
    skills: ["HTML", "CSS", "React"],
    preferences: {
      locations: ["San Francisco, CA"],
      remotePercentage: 30,
      skills: ["React", "UI/UX Design"],
      employmentTypes: [EmploymentType.FullTime],
      salaryMin: 70000,
      salaryMax: 100000,
    },
    registeredAt: new Date("2021-11-05"),
    updatedAt: new Date("2022-08-10"),
  },
  // Add more user objects here...
];

export default UsersDummyData;