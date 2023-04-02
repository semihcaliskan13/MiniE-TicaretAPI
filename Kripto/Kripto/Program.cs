string alfabe = "abcdefghijklmnopqrstuvwxyz";//26 harf hepsini kendi sırası kadar geriye götürecek. abz-zya
string input = "povzhvhvmwznvhhztvdrgsxfiivmghvhhrlmrmqhlmulinzgerzgsrhvcznkov";
string input2 = "4812x42ux36012274uu63230x6700y99yx4uvu15v91w89y499u659414zu29yz4";
string output = "";
//kensdisi kadar eksiği demek 26-kendisi kadar fazlası demek. 1-24 23 ileri götürecek. 2-25


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
