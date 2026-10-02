import { type Metadata } from 'next';
import { ApplyForm } from '@/components/apply-form';
import { SME_PROGRAM } from '@/lib/data';

const DESCRIPTION = `Apply for the ${SME_PROGRAM.name}. The ${SME_PROGRAM.standardEngineeringFee} engineering fee is waived for ${SME_PROGRAM.sponsoredSlots} selected Kenyan businesses — only a mandatory ${SME_PROGRAM.setupFee} infrastructure setup fee applies.`;

export const metadata: Metadata = {
  title: 'Apply for a Sponsored Slot',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.enigmolabs.co.ke/apply',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.enigmolabs.co.ke/apply',
    title: `${SME_PROGRAM.name} — Application Intake`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ApplyPage() {
  return <ApplyForm />;
}
