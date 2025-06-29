import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.certificates.title,
      display: about.certificates.display,
      items: about.certificates.certifications.map((cert) => cert.name),
    },
  ];

  return (
    <Column style={{ width: "70%", margin: "0 auto" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}      <Column fillWidth>        {/* Profile and Introduction Section */}
        <Flex
          fillWidth
          marginBottom="xl"
          marginTop="l"
          gap="xl"
          mobileDirection="column"
        >
          {/* Left side: Name, role, social links, and introduction */}
          <Flex direction="column" flex={9} gap="m">
            <Heading variant="display-strong-l" id={about.intro.title}>
              {person.name}
            </Heading>
            <Text variant="display-strong-xs" onBackground="neutral-weak">
              {person.role}
            </Text>

            {about.intro.display && (
              <Text variant="body-default-m" marginY="m">
                {about.intro.description}
              </Text>
            )}

            {social.length > 0 && (
              <Flex paddingTop="m" gap="8" wrap fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          weight="default"
                          variant="secondary"
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          key={`${item.name}-icon`}
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      </React.Fragment>
                    ),
                )}
              </Flex>)}
          </Flex>          {/* Right side: Profile picture */}
          {about.avatar.display && (
            <Flex direction="column" gap="m" horizontal="center" flex={3} minWidth="160">
              <Avatar src={person.avatar} size="xl" />
              {about.calendar.display && (
                <Flex
                  fitWidth
                  border="brand-alpha-medium"
                  style={{
                    backdropFilter: "blur(var(--static-space-1))",
                  }}
                  background="brand-alpha-weak"
                  radius="full"
                  padding="4"
                  gap="8"
                  marginTop="m"
                  vertical="center"
                  horizontal="center"
                >
                  <Icon paddingLeft="12" name="shield" onBackground="brand-weak" />
                  <Flex paddingX="8">Not a Real Hacker</Flex>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>

        {/* Certificates Section */}
        {about.certificates.display && (
          <>
            <Heading as="h2" id={about.certificates.title} variant="display-strong-s" marginBottom="xl">
              {about.certificates.title}
            </Heading>
            <Flex fillWidth gap="m" marginBottom="40" wrap horizontal="space-between">
              {about.certificates.certifications.map((cert, index) => (<Flex
                key={`${cert.name}-${index}`}
                direction="column"
                style={{ width: "30%", minWidth: "240px" }}
                marginBottom="l"
                border="neutral-medium"
                radius="l"
                padding="m"
              >
                {cert.image && (
                  <Flex
                    fillWidth
                    marginBottom="m"
                  >
                    <Media
                      enlarge
                      radius="m"
                      sizes="100%"
                      alt={`${cert.name} certificate`}
                      src={cert.image}
                    />
                  </Flex>
                )}
                <Text id={cert.name} variant="heading-strong-l" marginBottom="xs">
                  {cert.name}
                </Text>
                <Flex fillWidth horizontal="space-between" vertical="center" marginBottom="s">
                  <Text variant="body-default-s" onBackground="brand-weak">
                    {cert.issuer}
                  </Text>
                  <Text variant="heading-default-xs" onBackground="neutral-weak">
                    {cert.date}
                  </Text>
                </Flex>
                <Text variant="body-default-m" marginBottom="m">
                  {cert.description}
                </Text>
                {cert.link && (
                  <Flex style={{ marginTop: "auto" }}>
                    <Button
                      href={cert.link}
                      variant="secondary"
                      size="s"
                      weight="default"
                      arrowIcon
                    >
                      View Certificate
                    </Button>
                  </Flex>
                )}
              </Flex>
              ))}
            </Flex>
          </>
        )}
      </Column>
    </Column>
  );
}
