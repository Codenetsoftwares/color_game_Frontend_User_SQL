function AppDrawer({ children }) {

    function getLeftNavBar() {
        return (
            <div className='position-fixed '>
                <ul className='navbar-nav  flex-grow-1 p-0'>
                    <li className='nav-item'>
                        <a className='nav-link active' aria-current='page' href='#'>
                            Home
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link active' aria-current='page' href='#'>
                            Home
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='#'>
                            Link
                        </a>
                    </li>
                    <li className='nav-item dropdown'>
                        <a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            Dropdown
                        </a>
                        <ul className='dropdown-menu'>
                            <li>
                                <a className='dropdown-item' href='#'>
                                    Action
                                </a>
                            </li>
                            <li>
                                <a className='dropdown-item' href='#'>
                                    Another action
                                </a>
                            </li>
                            <li>
                                <hr className='dropdown-divider' />
                            </li>
                            <li>
                                <a className='dropdown-item' href='#'>
                                    Something else here
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }

    function getMidCarousel() {
		return (
			<>
				<div id='carouselExampleAutoplaying' class='carousel slide' data-bs-ride='carousel'>
					<div class='carousel-inner '>
						<div class='carousel-item active'>
							<img
								src='https://images.news18.com/ibnlive/uploads/2024/03/the-carnival-of-cricket-ipl-2024-begins-friday-in-chennai-2024-03-57866b703b220dfd84e70329b271fbd8-3x2.jpg'
								class='d-block w-100'
								alt='...'
								//   style={{ height: "300px", objectfit: "cover" }}
								style={{ height: '300px', objectfit: 'contain' }}
							/>
						</div>
						<div class='carousel-item'>
							<img
								src='https://www.hindustantimes.com/ht-img/img/2024/01/14/550x309/TOPSHOT-TENNIS-AUS-OPEN-33_1705249861778_1705249942860.jpg'
								class='d-block w-100'
								alt='...'
								//   style={{ height: "300px", objectfit: "cover" }}
								style={{ height: '300px', objectfit: 'contain' }}
							/>
						</div>
						<div class='carousel-item'>
							<img
								src='https://assets-webp.khelnow.com/d7293de2fa93b29528da214253f1d8d0/640x360/news/uploads/2024/02/football-lead-pic.jpg.webp'
								class='d-block w-100'
								alt='...'
								//   style={{ height: "300px", objectfit: "cover" }}
								style={{ height: '300px', objectfit: 'contain' }}
							/>
						</div>
					</div>
					<button class='carousel-control-prev' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='prev'>
						<span class='carousel-control-prev-icon' aria-hidden='true'></span>
						<span class='visually-hidden'>Previous</span>
					</button>
					<button class='carousel-control-next' type='button' data-bs-target='#carouselExampleAutoplaying' data-bs-slide='next'>
						<span class='carousel-control-next-icon' aria-hidden='true'></span>
						<span class='visually-hidden'>Next</span>
					</button>
				</div>
			</>
		);
	}

    function getBody() {
        return <>
            {getLeftNavBar()}
            {getMidCarousel()}
            <h1>{children}</h1>
        </>
    }

    return <div className='global-margin-top-loggedIn'>{getBody()}</div>;
}

export default AppDrawer;
