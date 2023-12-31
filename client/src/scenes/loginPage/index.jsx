import { Box, Typography, useTheme, useMediaQuery, InputBase} from "@mui/material";
import Form from "./Form.jsx";

const Loginpage = () => {


    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <Box width="100%"
            backgroundColor={theme.palette.background.alt} 
            p="1rem 6%"
            textAlign="center"
        >
            <Typography 
                fontWeight="bold" 
                fontSize="32px" 
                color="primary" 
            >
                Sociopedia
            </Typography>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{mb: "1.5rem"}}>
                    Welcome to Sociopedia
                </Typography>
                <Form />
            </Box>
            
        </Box>
        
        )
    };

export default Loginpage;