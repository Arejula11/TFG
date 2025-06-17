# ARPE clinical pathway identification algorithms

## Description
This algorithm is used to identified pattern in clinical database and create a Probabilistic Time Petri Net to represent clinical pathway.

## Installation
### Install on linux
1. Get python and git:
```bash
     sudo apt update
     sudo apt install python3 python3-venv git
```

2. Import project:
```bash
     git clone https://gitlab.crans.org/bleizi/arpe-identification.git
     cd arpe-identification
```

3. Start virtual env:
```bash
     python3 -m venv env
     source env/bin/activate
```

4. Install libraries:
```bash
    pip3 install -r requirements.txt
```

5. Find data:

We used data from Zaragoza hospital (not published) and from the WSU CASAS smart home project.

It can be donload here : https://casas.wsu.edu/datasets/assessmentdata.zip

Unzip data where put in a floder named database in the same folder of arpe-identification folder.

## Usage
1. Start virtual env:
```bash
     python3 -m venv env
     source env/bin/activate
```

2. Choose parameter in example.py or in example_casas.py:

You can change : filenames, location of data, name of output file and the minimal support searched.

Some part of examples are commented to focus on main part, but it can be uncommented to see other examples.

3. Run the program:
```bash
     python3 example.py
```

4. Results:
Prompt in the terminal and save files with PTPN (xml and png)

## Authors and acknowledgment
- Le Moigne
- Cristian Mahulea 
- Grégory Faraut
- Jérémie Saives (author of a previous version of pattern discovery algorithm)
- PTPN definition: Y. Emzivat, B. Delahaye, D. Lime, O. H. Roux. Probabilistic Time Petri Nets. 37th INTERNATIONAL CONFERENCE ON APPLICATIONS AND THEORY OF PETRI NETS AND CONCURRENCY, Jun 2016, Torun, Poland. pp.261-280
- WSU CASAS smart home project: D. Cook, A. Crandall, B. Thomas, and N. Krishnan. CASAS: A smart home in a box. IEEE Computer, 2013. http://eecs.wsu.edu/~cook/pubs/computer12.pdf

## License
GNU GPLv3
