import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
#imported all the relevant python packages which will be used in the following codes.

Observation_Number, Distance, Response = np.loadtxt("Data/Distance_Mpc.txt", skiprows=2, delimiter = '\t', unpack=True)
#Saved every variable separetely, each corresponding to each column title of the Distance_Mpc data (Observation_Number, Distance, Response)
#where Response is the third column of the dataset with 1s and 0s. the delimeter='\t' argument allows the varibales to be differentiated as on the txt file, they are separated by a significant amount of space, which is achieved by pressing the tab bottom in a keyboard

relevant_D=[]
relevant_obs_no=[]
for i in range(0, len(Response)):
    if Response[i]==1:
        relevant_D.append(Distance[i])
        relevant_obs_no.append(Observation_Number[i])
#set up a for loop in order to clean out the data (meaning I have stored the Distances and Observation numbers with the Response only = 1)
#Reference : Ariz Akhtar for assistance in this line of code.
        
def fit_func(x,a,mu,sig,m,c):
      f_gaussian = a*np.exp(-(x-mu)**2/(2*sig**2))
      line = m*x+c
      return f_gaussian + line
#defined a gaussian function - used worksheet 2 to copy the gaussian function code

v=[]                       
d=[]
SpectraData = np.loadtxt("Data/Halpha_spectral_data.csv", skiprows=4, delimiter=',', unpack=True)
#for i in range(0,60,2):
for i in range(0,len(Observation_Number),2):
    f, I = np.loadtxt("Data/Halpha_spectral_data.csv", skiprows=4, usecols=(i,i+1), delimiter=',', unpack=True)
#stored v and d as empty arrays which will be used for future purposes, Note how a for loop was utilised on the usecols argument within the previous line, in order to store f as the ith column, and the I as the (i+1)th column within the excel frequencies and spectral intensities data sets.
    sigma = np.std(f)
    initial_guess=[100,4.3e14,sigma,10,150]
    #initial guesses for the gaussian function defined earlier.
    po,po_cov=curve_fit(fit_func,f,I,initial_guess)
    fit = fit_func(f,*po)
    plt.plot(f, I,color='orange')
    plt.plot(f, fit_func(f, po[0], po[1], po[2], po[3], po[4]),color='black') # Reference: Hanna Nasir for help with this line.
    
    plt.xlabel("Frequency (Hz)") 
    plt.ylabel("Spectral Intensity (A.U.)") 
    plt.show()
    f_0=po[1] # these are all the frequencies for every frequency against spectral Intensity graph which correspond to the max peak of the graph using the gaussian + line fit.
    c = 2.9979e8 
    λ_0=c/f_0
    λ_e=6.5628e-7
    v_recessional = (c*(((λ_0/λ_e)**2 - 1)/((λ_0/λ_e)**2 + 1)))
    #used the given ratios between the observed and emitted wavelengths conpared to the recessional velocity and the speed of light in the computing script and algebraically rearranged tro obtain v_recessional.
    # the actual equation: (λ_0/λ_e)=np.sqrt(1 + (v/c)/1 - v/c). λ_e was also given in the script.
    cNumber = Observation_Number[i]
    rel_distance = None
    for j in range(0, len(relevant_obs_no)):
        if relevant_obs_no[j] == cNumber:
            rel_distance = relevant_D[j]
    if rel_distance == None:
        continue
#The loop is communicating with python if the observation number column with the 5 digit numbers, matches with one of the frequencies (now velocities using the equations above), to match it with its corresponding distance, and if not, to not display it, which helped me get rid of unmatched data and to plot the final graph.
#This for loop's purpose is to match the cleaned distances data with the velocities data (obtainted from the frequency data and after using c=fλ) by  matching the observation number for both data arrays from different data files, to then merge and plot the successfully.
    d.append(rel_distance)
    v.append(1e-3*v_recessional)
#appended the d and v variables to being able to use such outside the loop in order to draw the recessional velocity against distance graph.

plt.scatter(d,v,color='black', marker='x')
plt.xlabel("Distance (Mpc)") 
plt.ylabel("Recessional Velocity (km/s)") 
fit,cov = np.polyfit(d,v,1,cov=True)
fit_values = np.poly1d(fit)
plt.plot(d,fit_values(d), color='black')
plt.title('Recessional Velocity against Distances for redshifted Hα line from different galaxies')
plt.show()
print('H_0 = %.2f +/- %.2f Km/s/Mpc' %(fit[0], np.sqrt(cov[0,0])))
#plt function used which describes, shapes and edits the layouts of the graphs.
#a covariance matrix was set up wth the np.polyfit function by defining one of the variables for the function as 