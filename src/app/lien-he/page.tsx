import { Metadata } from 'next';
import ContactPageContent from './Content';
import {genSiteMetaData} from "@/constants/sitemetaData";

export const metadata: Metadata = genSiteMetaData('Liên hệ')


export default function ContactPage() {
  return <ContactPageContent />;
}
