// Email Template tsx

import {
  Html, Head, Body, Container, Tailwind, Preview,
  Heading, Section, Row, Column,
  Img, Text, Link, Button,
  Hr
} from "@react-email/components";

interface EmailTemplateWelcomeProps {
  name: string;
}

const EmailTemplateWelcome: React.FC<EmailTemplateWelcomeProps> = ({ name }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Devs @ Deakin Welcome</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-base font-sans">
          <Container className="bg-gray-50 px-10 py-10">
            <Img
              src={'https://i.imgur.com/7g4LDiq.png'}
              width="150"
              height="150"
              alt="Devs @ Deakin"
              className="mx-auto my-10"
            />
            <Heading className="text-center my-0 leading-8">Welcome, {name}!</Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  We're thrilled to have you join our growing network of passionate developers and IT enthusiasts. By subscribing to our newsletter, you've taken the first step towards staying informed and engaged with the latest trends, insights, and discussions in Deakin's world of software development.
                </Text>

                <Text className="text-base">Here's what you can expect from our newsletter:</Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-5">
                <strong>Exclusive Articles:</strong>{" "}
                Get access to in-depth articles and tutorials written by fellow students and industry professionals.
              </li>
              <li className="mb-5">
                <strong>Community Highlights:</strong>{" "}
                Stay updated with the latest projects, achievements, and events within the Devs @ Deakin community.
              </li>
              <li className="mb-5">
                <strong>Upcoming Events:</strong>{" "}
                Be the first to know about workshops, webinars, and meetups designed to enhance your skills and expand your network.
              </li>
              <li className="mb-5">
                <strong>Tips and Tricks:</strong>{" "}
                Receive practical advice and coding tips to help you excel in your development journey.
              </li>
            </ul>

            <Row>
              <Text className="text-base">To get started, why not check out some of our latest posts on the Devs @ Deakin website? You'll find a variety of content that caters to different interests and skill levels.</Text>
            </Row>

            <Section className="text-center">
              <Button className="bg-[#FFE900] text-black rounded-lg py-3 px-[18px]"
                href={siteUrl}>
                Visit Devs @ Deakin
              </Button>
            </Section>

            <Row>
              <Text className="text-base">We also encourage you to participate actively by sharing your own posts and articles. Your contributions are what make our community vibrant and valuable. If you have any questions or need assistance, feel free to reach out to us </Text>

              <Hr className="pt-5" />

              <Text> Once again, welcome to Devs @ Deakin! We look forward to seeing you thrive and contribute to our community.</Text>
              <Text>Happy coding!</Text>
              <Text>Best regards,</Text>
              <Text>The Devs @ Deakin Team</Text>
            </Row>
          </Container>

          <Container className="mt-10">
            <Section className="text-center">
              <Row className="text-center">
                <Link className="text-center">Unsubscribe</Link>
                <Text className="text-center text-gray-400 mb-45 font-mono">Devs @ Deakin</Text>
              </Row>
            </Section>
          </Container>

        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplateWelcome;