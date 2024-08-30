"use client";

import { useState } from "react";

const LoginStatement = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-sm mt-4">
      {/* First paragraph always visible */}
      <p>
        When you log in to our website using your Apple or Google account, we
        ensure your privacy and security by never sharing your private and
        confidential information with Apple or Google. This login method is
        designed to be secure, straightforward, and protective of your data,
        utilizing Apple and Google's robust security measures without
        compromising the integrity of your personal information.
        <span>
          {isExpanded ? (
            <div className="additional-info mt-2">
              <p>
                We only receive the necessary details to verify your identity,
                and no sensitive data stored on our site is ever passed on to
                them. This approach allows you to access our website with ease
                and assurance, knowing that your information remains secure and
                private at all times.
              </p>
              <p>
                When you use your Apple or Google account to sign in on our
                website, you are choosing a secure and straightforward way to
                access our website. Here's why this method is not only easy but
                also keeps your private information safe:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Top-Notch Security:</strong> Apple and Google are
                  leaders in security. By signing in through them, you benefit
                  from their world-class protection, without us ever having to
                  handle or store your passwords.
                </li>
                <li>
                  <strong>We Handle Less, You Worry Less:</strong> Since Apple
                  and Google manage your login details, we don't have to. This
                  means there's less risk on our end, and one less thing for you
                  to worry about.
                </li>
                <li>
                  <strong>Your Privacy Comes First:</strong> Your email and
                  personal details stay private. When you use Apple or Google to
                  log in, they give us only the information needed to create
                  your account. Apple even allows you to hide your email.
                </li>
                <li>
                  <strong>Fast and Familiar:</strong> Signing in through these
                  platforms makes accessing our services quicker and easier,
                  getting you where you need to go without the hassle.
                </li>
                <li>
                  <strong>Always Up-to-Date:</strong> Apple and Google
                  continuously update their services to follow the latest
                  security rules and protect your information.
                </li>
                <li>
                  <strong>Help When You Need It:</strong> Forgot your password?
                  No problem. Apple and Google offer easy ways to recover your
                  account, often faster and more secure than other methods.
                </li>
                <li>
                  <strong>Use It Anywhere:</strong> Whether you're on your
                  phone, tablet, or computer, signing in with your Apple or
                  Google account works seamlessly across all devices.
                </li>
              </ul>
              <p>
                We understand the importance of safeguarding your private and
                confidential information, which is why choosing secure login
                options like "Sign in with Apple" and "Sign in with Google" is a
                crucial step in our commitment. These methods streamline the
                authentication process and ensure that we do not handle or store
                sensitive login details, thereby reducing the risk of data
                breaches. By integrating these trusted platforms, we protect
                your personal information while providing a secure,
                user-friendly experience.
              </p>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#4338CA] hover:underline">
                ...Show less
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[#4338CA] hover:underline ml-2 inline-block">
              Read more...
            </button>
          )}
        </span>
      </p>
    </div>
  );
};

export default LoginStatement;
