import { Thread } from '../../../../shared/chatTypes'
import { bob, frank, tim } from './dummyUsers'

export const dummyThreads: Thread[] = [
  {
    id: 'thread1',
    participants: [bob.id, tim.id],
    messages: [
      {
        id: 'bt1',
        from: bob.id,
        message: "Hey Tim, it's Bob",
      },
      {
        id: 'bt2',
        from: tim.id,
        message: 'Hi Bob!',
      },
      {
        id: 'bt3',
        from: bob.id,
        message: "How's things",
      },
    ],
  },
  {
    id: 'thread1',
    participants: [frank.id, tim.id],
    messages: [
      {
        id: 'ft1',
        from: frank.id,
        message: 'This tim, is frank',
      },
      {
        id: 'ft2',
        from: tim.id,
        message: 'Hi frank!',
      },
      {
        id: 'ft3',
        from: frank.id,
        message: 'How are things',
      },
    ],
  },
]
