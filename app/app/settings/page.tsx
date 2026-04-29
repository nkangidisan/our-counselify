'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge, Button, Input, Select } from '@/components/ui/primitives';
import { AppLayout } from '@/components/layout/app-layout';
import { eastAfricanCountries, industries, organizationMembers } from '@/lib/counselify-data';
import { useAuth } from '@/context/AuthProvider';
import { authApi, supabase } from '@/lib/supabase';

const tabs = ['Profile', 'Organization', 'Members & Roles', 'Security', 'AI Preferences'] as const;

export default function SettingsPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>('Profile');
  const [inviteOpen, setInviteOpen] = useState(false);
  const { session } = useAuth();
  const [profileName, setProfileName] = useState('User A');
  const [profileEmail, setProfileEmail] = useState('usera@counselify.africa');
  const [profileCompany, setProfileCompany] = useState('LakeHub Growth Co.');
  const [profileIndustry, setProfileIndustry] = useState('Technology');
  const [profileCountry, setProfileCountry] = useState('Kenya');
  const [website, setWebsite] = useState('https://lakehub.africa');
  const [securityCurrentPassword, setSecurityCurrentPassword] = useState('');
  const [securityNewPassword, setSecurityNewPassword] = useState('');
  const [securityConfirmPassword, setSecurityConfirmPassword] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingOrganization, setSavingOrganization] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);

  async function saveProfile() {
    setStatus({ type: null, message: '' });
    if (!session?.user || !supabase) {
      setStatus({ type: 'error', message: 'You need an active session to save profile updates.' });
      return;
    }
    if (!profileName.trim()) {
      setStatus({ type: 'error', message: 'Full name is required.' });
      return;
    }
    setSavingProfile(true);
    const { error } = await supabase.from('profiles').upsert(
      {
        id: session.user.id,
        email: profileEmail.trim() || session.user.email || '',
        full_name: profileName.trim(),
        company_name: profileCompany.trim(),
        industry: profileIndustry,
        country: profileCountry,
      },
      { onConflict: 'id' }
    );
    setSavingProfile(false);
    setStatus(error ? { type: 'error', message: 'Could not save profile changes.' } : { type: 'success', message: 'Profile saved successfully.' });
  }

  async function saveOrganization() {
    setStatus({ type: null, message: '' });
    if (!session?.user || !supabase) {
      setStatus({ type: 'error', message: 'You need an active session to save organization updates.' });
      return;
    }
    if (!profileCompany.trim()) {
      setStatus({ type: 'error', message: 'Company name is required.' });
      return;
    }
    setSavingOrganization(true);
    const { error } = await supabase.from('profiles').upsert(
      {
        id: session.user.id,
        email: profileEmail.trim() || session.user.email || '',
        full_name: profileName.trim() || session.user.user_metadata?.full_name || null,
        company_name: profileCompany.trim(),
        industry: profileIndustry,
        country: profileCountry,
      },
      { onConflict: 'id' }
    );
    setSavingOrganization(false);
    setStatus(error ? { type: 'error', message: 'Could not save organization changes.' } : { type: 'success', message: 'Organization saved successfully.' });
  }

  async function updatePassword() {
    setStatus({ type: null, message: '' });
    if (!securityCurrentPassword || !securityNewPassword || !securityConfirmPassword) {
      setStatus({ type: 'error', message: 'All password fields are required.' });
      return;
    }
    if (securityNewPassword.length < 8) {
      setStatus({ type: 'error', message: 'New password must be at least 8 characters.' });
      return;
    }
    if (securityNewPassword !== securityConfirmPassword) {
      setStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }
    setSavingSecurity(true);
    const { error } = await authApi.updatePassword(securityNewPassword);
    setSavingSecurity(false);
    if (error) {
      setStatus({ type: 'error', message: error.message });
      return;
    }
    setSecurityCurrentPassword('');
    setSecurityNewPassword('');
    setSecurityConfirmPassword('');
    setStatus({ type: 'success', message: 'Password updated successfully.' });
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {status.type ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-accent-green/20 bg-[var(--accent-green-subtle)] text-accent-green' : 'border-accent-red/20 bg-[var(--accent-red-subtle)] text-accent-red'}`}>
            {status.message}
          </div>
        ) : null}
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Settings</p>
          <h1 className="mt-3 font-serif text-5xl text-white">Workspace and security settings</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">Manage profile details, organization settings, members, and AI preferences.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active === tab ? 'bg-primary text-white' : 'border border-white/10 bg-white/[0.03] text-text-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {active === 'Profile' && (
          <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
            <div className="glass-panel rounded-[32px] p-6 text-center">
              <div className="mx-auto h-28 w-28 rounded-full bg-[linear-gradient(135deg,#6366F1,#10B981)]" />
              <p className="mt-4 text-xl font-semibold text-white">User A</p>
              <p className="mt-1 text-sm text-text-secondary">usera@counselify.africa</p>
              <Button variant="ghost" className="mt-5 w-full">
                Upload Avatar
              </Button>
            </div>
            <div className="glass-panel rounded-[32px] p-6">
              <h2 className="text-2xl font-semibold text-white">Profile</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field label="Full name">
                  <Input value={profileName} onChange={(event) => setProfileName(event.target.value)} />
                </Field>
                <Field label="Email">
                  <Input value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} />
                </Field>
                <Field label="Company">
                  <Input value={profileCompany} onChange={(event) => setProfileCompany(event.target.value)} />
                </Field>
                <Field label="Industry">
                  <Select value={profileIndustry} onChange={(event) => setProfileIndustry(event.target.value)}>
                    {industries.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.key}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Country">
                  <Select value={profileCountry} onChange={(event) => setProfileCountry(event.target.value)}>
                    {eastAfricanCountries
                      .filter((country) => country.code !== 'EAC')
                      .map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                  </Select>
                </Field>
              </div>
              <Button className="mt-6" variant="primary" onClick={() => void saveProfile()} loading={savingProfile}>
                Save Profile
              </Button>
            </div>
          </div>
        )}

        {active === 'Organization' && (
          <div className="glass-panel rounded-[32px] p-6">
            <h2 className="text-2xl font-semibold text-white">Organization</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Company name">
                <Input value={profileCompany} onChange={(event) => setProfileCompany(event.target.value)} />
              </Field>
              <Field label="Website">
                <Input value={website} onChange={(event) => setWebsite(event.target.value)} />
              </Field>
              <Field label="Primary jurisdiction">
                <Select value={profileCountry} onChange={(event) => setProfileCountry(event.target.value)}>
                  {eastAfricanCountries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Industry">
                <Select value={profileIndustry} onChange={(event) => setProfileIndustry(event.target.value)}>
                  {industries.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.key}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Button className="mt-6" variant="primary" onClick={() => void saveOrganization()} loading={savingOrganization}>
              Save Organization
            </Button>
          </div>
        )}

        {active === 'Members & Roles' && (
          <div className="glass-panel rounded-[32px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Members & Roles</h2>
              <Button variant="primary" onClick={() => setInviteOpen(true)}>
                Invite Member
              </Button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    {['Member', 'Email', 'Role', 'Joined', 'Actions'].map((header) => (
                      <th key={header} className="px-4 py-3 text-sm font-medium text-text-secondary">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {organizationMembers.map((member) => (
                    <tr key={member.id} className="border-b border-white/10 last:border-b-0">
                      <td className="px-4 py-4 font-medium text-white">{member.name}</td>
                      <td className="px-4 py-4 text-sm text-text-secondary">{member.email}</td>
                      <td className="px-4 py-4">
                        <Badge variant="info">{member.role}</Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-text-secondary">{member.joined}</td>
                      <td className="px-4 py-4">
                        <Button size="sm" variant="ghost">
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'Security' && (
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="glass-panel rounded-[32px] p-6">
              <h2 className="text-2xl font-semibold text-white">Change password</h2>
              <div className="mt-5 space-y-4">
                <Field label="Current password">
                  <Input type="password" value={securityCurrentPassword} onChange={(event) => setSecurityCurrentPassword(event.target.value)} />
                </Field>
                <Field label="New password">
                  <Input type="password" value={securityNewPassword} onChange={(event) => setSecurityNewPassword(event.target.value)} />
                </Field>
                <Field label="Confirm password">
                  <Input type="password" value={securityConfirmPassword} onChange={(event) => setSecurityConfirmPassword(event.target.value)} />
                </Field>
              </div>
              <Button className="mt-6" variant="primary" onClick={() => void updatePassword()} loading={savingSecurity}>
                Update Password
              </Button>
            </div>
            <div className="glass-panel rounded-[32px] p-6">
              <h2 className="text-2xl font-semibold text-white">Active sessions</h2>
              <div className="mt-5 space-y-3">
                {['MacBook Pro • Nairobi', 'iPhone 15 Pro • Kampala', 'Chrome • Dar es Salaam'].map((session) => (
                  <div key={session} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{session}</p>
                        <p className="mt-1 text-sm text-text-secondary">Last seen within the last 24 hours</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6" variant="danger">
                Revoke All Sessions
              </Button>
            </div>
          </div>
        )}

        {active === 'AI Preferences' && (
          <div className="glass-panel rounded-[32px] p-6">
            <h2 className="text-2xl font-semibold text-white">AI Preferences</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Default jurisdiction">
                <Select defaultValue="Kenya">
                  {eastAfricanCountries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Preferred response style">
                <Select defaultValue="Detailed">
                  <option>Concise</option>
                  <option>Balanced</option>
                  <option>Detailed</option>
                </Select>
              </Field>
              <Field label="Language preference">
                <Select defaultValue="English">
                  <option>English</option>
                  <option>Swahili</option>
                </Select>
              </Field>
            </div>
            <label className="mt-6 flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-text-secondary">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/10 bg-white/[0.03]" />
              I acknowledge that AI outputs are assistive and not legal representation.
            </label>
            <Button className="mt-6" variant="primary">
              Save Preferences
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {inviteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-xl"
            onClick={() => setInviteOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-lg rounded-[32px] border border-white/10 bg-bg-surface p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-3xl font-semibold text-white">Invite member</h2>
              <div className="mt-6 space-y-4">
                <Field label="Email">
                  <Input defaultValue="new.member@company.com" />
                </Field>
                <Field label="Role">
                  <Select defaultValue="Compliance Lead">
                    <option>General Counsel</option>
                    <option>Compliance Lead</option>
                    <option>Finance Controller</option>
                    <option>Viewer</option>
                  </Select>
                </Field>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setInviteOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setInviteOpen(false)}>
                  Send Invite
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-text-primary">{label}</span>
      {children}
    </label>
  );
}
