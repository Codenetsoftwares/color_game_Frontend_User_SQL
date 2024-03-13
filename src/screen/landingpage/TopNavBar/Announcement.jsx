import React, { useState, useEffect } from 'react';
import acnmnt from '../../../Asset/ancmntv.png';
import { getAnnouncement } from '../../../utils/apiService';

const Announcement = () => {
  const [announcement, SetAnnouncement] = useState('');

  async function HandleAnnouncement() {
    // const response = await getAnnouncement();

    // console.log('Response for getAnnouncement line 11', response);
    SetAnnouncement('');
  }

  useEffect(() => {
    HandleAnnouncement();
  }, []);

  console.log('Response for getAnnouncement', announcement);

  return (
    <div>
      <div class="card border-0 rounded-0" style={{ backgroundColor: '#066196' }}>
        <div class="card-body p-0">
          <div class="d-flex bd-highlight">
            <div class="w-25 bd-highlight">
              <img src={acnmnt} className="" style={{ width: '30px' }} alt="" />
            </div>
            <marquee class="text-white fs-6">{announcement ? announcement : 'coming soon...'}</marquee>
            <div class="flex-shrink-1 bd-highlight"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
