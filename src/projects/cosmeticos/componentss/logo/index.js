const Logo = () => (
  <div className="logo">
    <img src="/favicon.png" width={24} height={24} />
    <h4>Cosméticos</h4>
    <style jsx>
      {`
        .logo {
          border: 3px solid #2e31be;
          border-radius: 1em;
          display: flex;
          margin: 0 5px;
          color: #2e31be;
          padding: 0.5em;
        }
        .fa-bacon {
          font-size: 2em;
          width: 30px;
          height: 30px;
        }
      `}
    </style>
  </div>
);

export default Logo;
