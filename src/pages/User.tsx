import React from 'react';
import { RouteComponentProps } from '@reach/router';
import bytes from 'bytes';
import { useAuthorized } from 'hooks/use-auth';
import { CheckCircle, XCircle } from 'components/Icons';
import { spaceUsage } from 'resources/dropbox';
import { Tooltip } from 'components/Tooltip';

const User: React.FC<RouteComponentProps> = () => {
  const { user } = useAuthorized();
  const usage = spaceUsage.read(user.account_id);

  return (
    <>
      <main>
        <div>
          {user.profile_photo_url && (
            <img
              src={user.profile_photo_url}
              alt={`Avatar for ${user.name.display_name}`}
            />
          )}
          {!user.profile_photo_url && <span>{user.name.abbreviated_name}</span>}
        </div>
        <div>
          <h3>{user.name.display_name}</h3>
          <div>
            {user.email}
            <Tooltip
              label={
                user.email_verified ? 'Email verified' : 'Email not verified'
              }
            >
              {user.email_verified ? <CheckCircle /> : <XCircle />}
            </Tooltip>
          </div>
        </div>

        <div>
          <div style={{ width: '100%', height: 5, background: 'black' }}>
            <div
              style={{
                width: `${100 * (usage.used / usage.allocation.allocated)}%`,
                height: 5,
                background: 'blue',
              }}
            />
          </div>
          <p>
            {bytes(usage.used)} / {bytes(usage.allocation.allocated)}
          </p>
        </div>
      </main>
      <pre style={{ marginTop: 500 }}>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default User;
