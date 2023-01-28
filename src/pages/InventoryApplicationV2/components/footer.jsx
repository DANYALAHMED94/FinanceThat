import React from "react";

export default function Footer() {
  return (
    <footer className="applicationFooter">
      <div>
        <img src="/assets/image/financethat-logo.svg" alt="logo" />{" "}
      </div>

      <div className="flexCenter">
        <p>
          <Link>Privacy Policy </Link>- <Link>Terms & Conditions</Link>
        </p>
        <p>info@financethat.ca - 1-844-354-5454</p>
      </div>
    </footer>
  );
}
