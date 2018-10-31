export default {
  user: {
    id: 'abx',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: 'https://placeimg.com/640/640/people/'
  },
  userSettings: {},
  projectList: {
    '123': {
      name: 'My Start-up',
      avatar: 'https://placeimg.com/640/640/tech',
      description: 'We plan to rule the world'
    }
  },
  project: {
    projectId: '123',
    name: 'My Start-up',
    avatar: 'https://placeimg.com/640/640/tech',
    description: 'We plan to rule the world'
  },
  team: {
    'abx': {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://placeimg.com/640/640/people'
    },
    'abc': {
      firstName: 'Jane',
      lastName: 'Doe',
      fullName: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      avatar: 'https://placeimg.com/640/640/animals'
    },
    'abd': {
      firstName: 'Mark',
      lastName: 'Doe',
      fullName: 'Mark Doe',
      email: 'mark.doe@gmail.com',
      avatar: 'https://placeimg.com/640/640/architecture'
    },
    'abe': {
      firstName: 'Jill',
      lastName: 'Doe',
      fullName: 'Jill Doe',
      email: 'jill.doe@gmail.com',
      avatar: 'https://placeimg.com/640/640/nature'
    }
  },
  tasks: {
    'task1': {
      date: '2018-11-01T00:00:00.000Z',
      title: 'Partners meeting',
      notes: 'We should get together and discuss some stuff about our financial situation',
      owner: 'abx',
      asignee: ['abx', 'abc', 'abd', 'abe'],
      done: true
    },
    'task2': {
      date: '2018-11-02T00:00:00.000Z',
      title: 'UI review',
      notes: '',
      owner: 'abx',
      asignee: ['abx'],
      done: false
    },
    'task3': {
      date: '2018-11-03T00:00:00.000Z',
      title: 'Discuss the next big market',
      notes: 'Hey John, lets get together and find an entrypoint to that juicy market we heard of',
      owner: 'abe',
      asignee: ['abx', 'abe'],
      done: false
    },
    'task4': {
      date: '2018-11-04T00:00:00.000Z',
      title: 'LETS PARTY',
      notes: 'nuff\' said',
      owner: 'abx',
      asignee: ['abx', 'abc', 'abd', 'abe'],
      done: false
    }
  }
}
