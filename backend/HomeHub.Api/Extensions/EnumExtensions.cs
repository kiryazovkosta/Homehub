using System.ComponentModel;
using System.Reflection;

namespace HomeHub.Api.Extensions;

public static class EnumExtensions
{
    public static string GetDescription<TEnum>(this TEnum value) where TEnum : Enum
    {
        var field = typeof(TEnum).GetField(value.ToString());
        var attr = field?.GetCustomAttribute<DescriptionAttribute>();
        return attr?.Description ?? value.ToString();
    }
}