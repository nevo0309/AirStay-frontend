import { useSelector } from "react-redux"

export function AppFooter() {
  const count = useSelector(storeState => storeState.userModule.count)

  return (
    <footer className='app-footer main-container full flex'>
      <section>
        <footer className='footer flex column'>
          <h1>Project developed by:</h1>
          <p className='linkdin flex'>
            <a
              href='https://www.linkedin.com/in/ofir-bozna-704857306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
              target='_blank'
              rel='noreferrer'>
              <i className='fa-brands fa-linkedin'></i> Ofir Bozna Nidam
            </a>
            |
            <a
              href='https://www.linkedin.com/in/nevo-yaakoby-1a9453245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
              target='_blank'
              rel='noreferrer'>
              <i className='fa-brands fa-linkedin'></i> Nevo Yaakoby
            </a>
            |
<<<<<<< HEAD
            <a href="http://www.linkedin.com/in/dima-dovgan-479987210" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i> Dima Dovgan
=======
            <a
              href='http://www.linkedin.com/in/dima-dovgan-479987210'
              target='_blank'
              rel='noreferrer'>
              <i className='fa-brands fa-linkedin'></i> Dima Dovgan
>>>>>>> f-wishlist-page
            </a>
          </p>
          <p className='github flex column'>
            <div className='flex'>
              <a
                href='https://github.com/nevo0309/AirStay-frontend'
                target='_blank'
                rel='noreferrer'>
                <i className='fa-brands fa-github'></i>Frontend
              </a>
              |
              <a
                href='https://github.com/nevo0309/airstay-backend'
                target='_blank'
                rel='noreferrer'>
                <i className='fa-brands fa-github'></i> Backend
              </a>
            </div>
          </p>
        </footer>
      </section>
    </footer>
  )
}
