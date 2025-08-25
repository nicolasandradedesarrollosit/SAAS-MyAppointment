export default {
  genSalt: jest.fn(async () => 'sal'),
  hash: jest.fn(async (txt) => `hash(${txt})`),
  compare: jest.fn(async (txt, hash) => hash === `hash(${txt})`)
};