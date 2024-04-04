import { Box, useMediaQuery, useTheme } from '@mui/material'
import robot from '../components/shared/robot.png'
import openai from '../components/shared/openai.png'
import chat from '../components/shared/chat.png'
import Typer from '../components/shared/Typer'
import Footer from '../components/Footer'


const Home = () => {
  const theme = useTheme()
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box width={'100%'} height={'100%'} >
      <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', mx: 'auto', mt: 4}}>
        <Box>
          <Typer />
        </Box>
        <Box sx={{width: '100%', display: 'flex', flexDirection: {md: 'row', xs: 'column', sm: 'column'}, gap: 3, my:10}}>
          <img src={robot} alt="robot" style={{width: '200px', margin:'auto'}} />
          <img className='image-inverted rotate' src={openai} alt="openai" style={{width: '200px', margin:'auto'}} />
        </Box>
        <Box sx={{display: 'flex', width: '100%', mx:'auto'}}>
        <img  src={chat} alt="chat" style={{width: isBelowMd  ? "80%" : '60%', margin:'auto', borderRadius: 20, boxShadow: '-5px -5px 105px #64f3d5', marginTop:'10px', marginBottom: 20}} />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default Home