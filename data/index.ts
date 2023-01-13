export interface Service {
  id: number
  img: string
  text: string
  bg: string
}

export const services: Service[] = [
  {
    id: 1,
    img: '/icons/install.svg',
    text: '安调',
    bg: '#62CE46',
  },
  {
    id: 2,
    img: '/icons/fix.svg',
    text: '维修',
    bg: '#40D39E',
  },
  {
    id: 3,
    img: '/icons/screen.svg',
    text: '询检',
    bg: '#5C7CEB',
  },
  {
    id: 4,
    img: '/icons/auth.svg',
    text: '认证',
    bg: '#62CE46',
  },
  {
    id: 5,
    img: '/icons/train.svg',
    text: '培训',
    bg: '#40D39E',
  },
  {
    id: 6,
    img: '/icons/update.svg',
    text: '软件升级',
    bg: '#5C7CEB',
  },
]
