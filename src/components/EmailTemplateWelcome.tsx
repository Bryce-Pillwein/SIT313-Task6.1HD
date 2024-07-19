// Email Template tsx

import { Body, Container, Head, Html } from "@react-email/components";

interface EmailTemplateWelcomeProps {
  name: string;
}

const EmailTemplateWelcome: React.FC<EmailTemplateWelcomeProps> = ({ name }) => {

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome!</title>
      </Head>
      <Body>
        <Container>
          <h1 className="text-center">Welcome, {name}!</h1>
        </Container>
      </Body>
    </Html>
  );
};


export default EmailTemplateWelcome;