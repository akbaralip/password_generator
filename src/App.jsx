import { useState } from 'react'
import './App.css'
import {
  numbers,
  specialCharacters,
  lowerCaseLetters,
  upperCaseLetters
} from './Characters'
import 'tailwindcss/tailwind.css';
import Switch from '@mui/material/Switch';

import { motion, AnimatePresence } from 'framer-motion';

import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Slider from '@mui/material/Slider';

import Tooltip from '@mui/material/Tooltip';

import CopyToClipboard from 'react-copy-to-clipboard';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { Button } from '@mui/material';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));


function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(6)
  const [includeUpperCase, setIncludeUpperCase] = useState(true)
  const [includeLowerCase, setIncludeLowerCase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copy, setCopy] = useState(false)

  function generatePassword() {
    let characters = "";

    if (includeUpperCase) {
      characters += upperCaseLetters
    }
    if (includeLowerCase) {
      characters += lowerCaseLetters
    }
    if (includeSymbols) {
      characters += specialCharacters
    }
    if (includeNumbers) {
      characters += numbers
    }

    if (characters.length <= 0) {
      toast.error("Please select any  one", {

        theme: "colored"
      })
      return
    }

    setPassword(createPassword(characters))
  }

  function createPassword(characters) {
    let password = "";
    let charactersLength = characters.length;
    console.log('charactersLength===>>', charactersLength);

    for (let i = 0; i < passwordLength; i++) {
      let index = Math.round(Math.random() * charactersLength - 1)
      console.log('index===>>', index);

      if (index < 0) {
        index = 0;
      }
      password += characters[index]
      console.log('password===>>', password);
    }
    return password
  }


  const handleLength = (e, newValue) => {
    setPasswordLength(newValue)
  }

  const copyStatus = copy ? 'copy' : 'copied';

  const handleCopyClick = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 1000);
  };

  const profile = import.meta.env.VITE_REACT_APP_PROFILE_URL;

  const handleClick = () => {
    window.location.href = profile;
  };



  return (
    <>
      <div className=" background-image flex-col p-4 h-screen bg-cover bg-center flex items-center justify-center"
      >

        <div className='mb-14 mt-4'>

          <h1 className="text-3xl font-bold mb-2 text-white">Password Generator</h1>

          <motion.div
            initial={{ opacity: 0, y: -0 }}
            animate={{ opacity: 1, y: 2 }}
            transition={{ duration: 7 }}
            className=" text-gray-300 font-serif text-md font-bold tracking-tight "
          >
            Create a strong and secure password by enabling uppercase and lowercase letters, numbers, and special characters. Diverse characters make your password resilient against hacking methods.
          </motion.div>
        </div>

        <div className="flex-1 flex flex-row">
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-4">
              <div className="ml-2 border p-2 mx-2 w-64 h-8 text-center items-center overflow-hidden">
                <span className='block text-white'>{password}</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <CopyToClipboard text={password} onCopy={handleCopyClick}>
                  <Tooltip title={copy ? 'Copied!' : 'Copy to Clipboard'} arrow>
                    {!copy ? (
                      <ContentCopyOutlinedIcon className="cursor-pointer text-gray-500 hover:text-blue-500 transition duration-300" />
                    ) : (
                      <ContentCopyTwoToneIcon className="cursor-pointer text-green-500" />
                    )}
                  </Tooltip>
                </CopyToClipboard>
              </motion.div>


            </div>

            <motion.div
              className='box'
              transition={{
                type: 'spring',
                stiffness: 100,
                mass: 1,
                damping: 1
              }}
              animate={{ x: 20 }}
            >
              <div className="mt-2">
                <Button
                  variant="contained"
                  color="success"
                  onClick={generatePassword}
                >
                  Generate Password
                </Button>
              </div>
            </motion.div>

          </div>

          <div className="flex-1 pl-4 flex flex-col">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
              className="text-semibold font-medium text-sm sm:text-base"
            >
              <div className="mb-4 flex items-center">
                <p className="text-lg mb-2 mr-4 text-white font-serif">Add Uppercase Letters</p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IOSSwitch
                    checked={includeUpperCase}
                    onChange={() => setIncludeUpperCase(!includeUpperCase)}
                    inputProps={{ 'aria-label': 'toggle switch' }}
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
              className="text-semibold font-medium text-sm sm:text-base"
            >
              <div className="mb-4 flex items-center">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
                  className="text-semibold font-medium text-sm sm:text-base"
                >

                </motion.div>
                <p className="text-lg mb-2 mr-4 text-white font-serif">Add Lowercase Letters</p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IOSSwitch
                    checked={includeLowerCase}
                    onChange={() => setIncludeLowerCase(!includeLowerCase)}
                    inputProps={{ 'aria-label': 'toggle switch' }}
                  />

                </motion.div>

              </div>
            </motion.div>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
              className="text-semibold font-medium text-sm sm:text-base"
            >
              <div className="mb-4 flex items-center">
                <p className="text-lg mb-2 mr-4 text-white font-serif">Include Numbers</p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IOSSwitch
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers(!includeNumbers)}
                    inputProps={{ 'aria-label': 'toggle switch' }}
                  />

                </motion.div>

              </div>
            </motion.div>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
              className="text-semibold font-medium text-sm sm:text-base"
            >
              <div className="mb-4 flex items-center">
                <p className="text-lg mb-2 mr-4 text-white font-serif">Include Symbols</p>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IOSSwitch
                    checked={includeSymbols}
                    onChange={() => setIncludeSymbols(!includeSymbols)}
                    inputProps={{ 'aria-label': 'toggle switch' }}
                  />
                </motion.div>

              </div>
            </motion.div>

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
              className="text-semibold font-medium text-sm sm:text-base"
            >

            </motion.div>
            <p className="text-lg mb-2 mr-4 text-white">Password Length</p>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.3 } }}
              className="text-semibold font-medium text-sm sm:text-base"
            >
              <Slider
                aria-labelledby="slider-label"
                value={passwordLength}
                onChange={handleLength}
                valueLabelDisplay="auto"
                color="success"
                step={1}
                marks
                min={1}
                max={12}
              />
            </motion.div>

          </div>

        </div>
        <footer className='my-2 mx-3 text-sm text-gray-300 self-end cursor-pointer d-flex justify-content-end align-items-center' onClick={handleClick}>
          <span className="d-none d-sm-inline">Developed by : </span>
          <span className="d-sm-none">Akbr Ali</span>
        </footer>
        <ToastContainer />
      </div>

    </>
  )
}

export default App
