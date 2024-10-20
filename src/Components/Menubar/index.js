import './index.css';
const Menubar = () => {
  return (
    <div className="ac-ln-content">
      <div className='ac-ln-title-container'>
        <a className='ac-ln-title' href="/airpods-pro/">
          AirPods&nbsp;Pro 2
        </a>
      </div>
      <div className='ac-ln-menu'>
        <a className='ac-ln-menu-title' href="/airpods-pro/">
          Overview
        </a>
        <a className='ac-ln-menu-title' href="/airpods-pro/">
          Hearing Health
        </a>
        <a className='ac-ln-menu-title' href="/airpods-pro/">
          Tech Specs
        </a>
        <a className='ac-ln-menu-title' href="/airpods-pro/">
          Compare
        </a>
      </div>
    </div>
  );
};

export default Menubar;
