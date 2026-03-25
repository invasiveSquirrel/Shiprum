#!/bin/bash
# Šiprum Launch Wrapper
# Ensures NVM is loaded and the app runs in the correct environment.

# Load NVM from correct location
export NVM_DIR="/home/chris/.config/nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
else
    # Fallback to default
    export NVM_DIR="$HOME/.nvm"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        source "$NVM_DIR/nvm.sh"
    fi
fi

cd /home/chris/Shiprum || exit 1

# Check for Vite
if ! lsof -i:3000 -t >/dev/null; then
    npm run dev &
    VITE_PID=$!
    
    # Wait for Vite (max 30s)
    for i in {1..30}; do
        if lsof -i:3000 -t >/dev/null; then
            break
        fi
        sleep 1
    done
fi

npm run electron:dev

# Cleanup Vite if we started it
if [ ! -z "$VITE_PID" ]; then
    kill "$VITE_PID"
fi
