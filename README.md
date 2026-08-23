# Blazin OS

Blazin OS is a browser-based desktop operating system built as a single HTML file. It runs directly in a web browser and includes a full desktop interface with windows, a dock, desktop shortcuts, a launcher, customizable backgrounds, and built-in applications.

## Features

Blazin OS includes a functional Notes app for creating and editing notes. Notes are saved automatically in the browser, so they remain available after closing and reopening the OS.

The Calculator app handles normal arithmetic operations including addition, subtraction, multiplication, division, percentages, decimals, sign changes, clearing, and backspace.

The Files app provides a virtual filing system called Blazin Drive. It includes folders such as Documents, Downloads, and Pictures, and lets you create folders and text files, move through folders, rename items, delete items, and open text files for editing. The virtual filesystem is saved using browser storage.

The Terminal provides a simple command-line interface inside the OS. It currently supports commands such as `help`, `clear`, `date`, `whoami`, `apps`, and `echo`, and is designed as a base for adding more terminal functionality later.

The Calendar app shows the current date and provides a basic place for future calendar functionality.

Settings lets you change the OS accent color and reset the virtual Blazin Drive filing system.

Blazin Music provides an in-OS music player with a track library, search, playback controls, and support for loading local audio files such as MP3 and OGG files. Music plays inside the application instead of redirecting the user to another website.

Blazin Arena is the built-in game. It has a controllable player avatar, WASD or arrow-key movement, mouse aiming, shooting, a dash ability, enemy waves, enemy health, player health, scoring, experience points, leveling, particles, stronger enemies, and a restart system.

## Desktop

Desktop shortcuts can be used to launch applications directly. The dock provides quick access to commonly used applications, while the launcher provides access to the complete application list.

Application windows can be moved, minimized, maximized, closed, and brought to the front when selected.

## Backgrounds

Blazin OS can use a custom background image placed beside the HTML file. The OS looks for:

`bg.png`  
`bg.jpg`  
`bg.jpeg`  
`bg.webp`  
`bg.gif`

Using `bg.png` is recommended.

## Storage

Blazin OS uses browser `localStorage` to save Notes and the virtual Blazin Drive filesystem. This means the data is stored locally in the browser rather than on an online server.

## Running Blazin OS

Blazin OS does not require a server or installation. Open `BlazinOS.html` in a modern browser and the OS will start directly.

## Project Test

You can test the current web version of Blazin OS here:

https://blazinos.netlify.app/

## Developer Socials

Instagram: https://instagram.com/blazinkiller_007

Discord: https://discord.com/users/blazinkiller_0981_90402