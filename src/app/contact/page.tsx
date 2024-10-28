import { Metadata } from 'next';
import ContactPageContent from './Content';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
