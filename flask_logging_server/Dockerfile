FROM python
 
# Copy the current directory contents into the container at /app
COPY . .
 
 
# Set the working directory in the container
 WORKDIR /.
 COPY requirements.txt .
 RUN pip install --user -r requirements.txt
 
RUN pip install flask
 
# Expose the DICOM
EXPOSE 5000
 
# Run the app
CMD ["python","-u", "logserver.py"]

