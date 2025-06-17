#!/bin/bash
# This script is used to analyze the Lola service.
# Usage: ./analyze.sh <net>
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <net>"
    exit 1
fi
NET=$1
lola --formula="EF DEADLOCK" $NET