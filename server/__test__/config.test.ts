import config from '../src/config'

test('check config is correct', () => {
    expect(config).toHaveProperty('service.port')
    expect(config).toHaveProperty('source.url')
    expect(config).toHaveProperty('whiteList')
})

