string alfabe = "abcdefghijklmnopqrstuvwxyz";
string input = "povzhvhvmwznvhhztvdrgsxfiivmghvhhrlmrmqhlmulinzgerzgsrhvcznkov";
string input2 = "4812x42ux36012274uu63230x6700y99yx4uvu15v91w89y499u659414zu29yz4";
string output = "";



foreach (var item in input2)
{
    if ((int)item >= 97 )
    {
        output += alfabe[25 - (alfabe.IndexOf(item))];
    }
    else
    {
        output += item;
    }
   
}
Console.WriteLine(output);
