import Router from './Router'
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', () => {
  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  }

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock, {});

    expect(result).to.eq(Router);
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router
          .use('/', BlockMock, {})
          .start();

      Router.back();

      expect(window.history.length).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    Router
        .use('/', BlockMock, {})
        .start();

    expect(window.history.length).to.eq(1);
  });

  it('should render pages on history go action"', () => {
    Router.go("/first")
    Router.go("/second")

    expect(Router.history.length).to.eq(3);
  });
});